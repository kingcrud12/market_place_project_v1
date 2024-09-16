import express, { Router, Request, Response } from 'express';
import bodyParser from "body-parser";
import { isAdmin, isAuthenticated } from "../middlewares/auth";
import { createPaymentSession, handleStripeWebhook, paymentCancel, paymentSuccess } from "../controllers/payment";

const paymentRoutes : Router = express.Router()


/**
 * @swagger
 * tags:
 *   name: Bills
 *   description: Routes pour la gestion des paiements et des webhooks
 */

/**
 * @swagger
 * /bills/webhook:
 *   post:
 *     summary: Gérer le webhook de Stripe
 *     tags: [Bills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Les données du webhook de Stripe
 *     responses:
 *       200:
 *         description: Webhook traité avec succès
 *       400:
 *         description: Données invalides
 */
paymentRoutes.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

/**
 * @swagger
 * /bills/success:
 *   get:
 *     summary: Page de succès de paiement
 *     tags: [Bills]
 *     responses:
 *       200:
 *         description: Page de succès de paiement affichée
 */
paymentRoutes.get('/success', paymentSuccess);

/**
 * @swagger
 * /bills/cancel:
 *   post:
 *     summary: Page d'annulation de paiement
 *     tags: [Bills]
 *     responses:
 *       200:
 *         description: Page d'annulation de paiement affichée
 */
paymentRoutes.post('/cancel', paymentCancel);


export default paymentRoutes