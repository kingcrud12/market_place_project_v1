import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import { EndpointSecret, JWT_SECRET, STRIPE_SECRET_KEY, } from '../../secret';
import { prismaClient } from '../../start/start';
import { error } from 'console';

const prisma = new PrismaClient();
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

// je créée une session de paiement et je gère le statut de la commande
export const createPaymentSession = async (req: Request, res: Response) => {
  try {
    // Récupérer l'ID de l'utilisateur à partir du token JWT
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Token non fourni. Vous devez être authentifié pour réaliser cette opération." });
    }

    // Décoder le token JWT pour obtenir l'ID de l'utilisateur
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Récupérer l'ID de l'utilisateur depuis le token
    const userId = decodedToken.userId;

    // Récupérer l'utilisateur dans la base de données
    const user = await prismaClient.user.findFirst({
      where: {
        id: Number(userId),
      },
    });

    // Récupérer l'ID de la commande depuis le corps de la requête
    const { orderId } = req.body;

    // Récupérer les informations de la commande à partir de son ID
    const order = await prismaClient.order.findUnique({
      where: { id: parseInt(orderId) },
    });

    if (!order) {
      return res.status(404).json({ message: "La commande spécifiée n'existe pas" });
    }

    // Convertir les productIds en tableau de nombres
    const productIds = order.productIds.split(',').map(id => parseInt(id.trim()));

    // Récupérer les produits à partir de leurs IDs
    const products = await prismaClient.cartProduct.findMany({
      where: { cartId: order.cartId, productId: { in: productIds } },
      include: { product: true },
    });

    // Créer une session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal', 'mobilepay'],
      line_items: products.map(cartProduct => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: cartProduct.product.name,
          },
          unit_amount: cartProduct.product.price * 100, // Stripe charge les montants en centimes
        },
        quantity: cartProduct.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.BACKEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BACKEND_URL}/cancel`,
      metadata: {
        orderId: order.id,
      },
    });

    // Retourner l'URL de la session de paiement
    return res.status(200).json({ url: session.url, session });
  } catch (error) {
    console.error('Erreur lors de la création de la session de paiement :', error);
    return res.status(500).json({ message: 'Erreur interne du serveur', error });
  }
};

// je gère les webhooks Stripe pour mettre à jour le statut de la commande
export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = EndpointSecret as string;

  if (!sig) {
    console.error('Signature du webhook Stripe manquante.');
    return res.status(400).send('Signature du webhook manquante.');
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Erreur de signature du webhook Stripe:', error);
    return res.status(400).send(`Webhook Error: ${error}`);
  }

  // je gère l'événement
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata!.orderId;

    // Je mets à jour le statut de la commande en 'PAID'
    await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { status: 'PAID' },
    });
  } else if (event.type === 'checkout.session.async_payment_failed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata!.orderId;

    // Je mets à jour le statut de la commande en 'UNPAID'
    await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { status: 'UNPAID' },
    });
  } else if (event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata!.orderId;

    // Je mets à jour le statut de la commande en 'PAID'
    await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { status: 'PAID' },
    });
  }

  res.status(201).send('Received Stripe webhook event');
};
// Endpoints pour success et cancel
export const paymentSuccess = async (req: Request, res: Response) => {
  const sessionId = req.query.session_id;

  // je peux récupérer les détails de la session de paiement ici si nécessaire
  // const session = await stripe.checkout.sessions.retrieve(sessionId);

  return res.status(201).send(`Payment was successful! Session ID: ${sessionId}`);
};

export const paymentCancel = async (req: Request, res: Response) => {
  return res.status(201).send('Payment was canceled.');
};

