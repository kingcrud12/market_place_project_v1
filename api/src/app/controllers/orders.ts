import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../secret';
import { prismaClient } from '../../start/start';

const prisma = new PrismaClient();

//1. Create order
export const createOrder = async (req: Request, res: Response) => {
  try {
    //je récupère  l'ID de l'utilisateur à partir du token JWT
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Token non fourni. Vous devez être authentifié pour réaliser cette opération." });
    }

    // Je décode  le token JWT pour obtenir l'ID de l'utilisateur
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string, email: string };

    //je récupère l'ID de l'utilisateur et son mail depuis le token
    const userId = decodedToken.userId;
    const email = decodedToken.email

    // je recherche l'utilisateur dans la bdd à l'aide de l'email récupérée depuis le token
    const user = await prismaClient.user.findFirst({
      where: {
          email: email
      },
      select: {
          emailConfirmed: true
      }
  })

     //je vérifie si l'adresse mail récupérée dans la bdd et qui a l'utilisateur dans la base de données a bien la valeur true
     if(!user || user.emailConfirmed !== true){
      return res.status(403).json({error: "votre adresse mail n'est pas confirmée."})
      }

    //je récupère l'ID du panier depuis le corps de la requête
    const cartId : string = req.body.cartId;

    // je récupère les informations du panier à partir de son ID, en incluant les produits associés
    const cart = await prisma.cart.findUnique({
      where: { id: parseInt(cartId) },
      include: { products: true }
    });

    if (!cart) {
      return res.status(404).json({ message: 'Le panier spécifié n\'existe pas' });
    }

    // je récupère les IDs des produits du panier
    const productIds = cart.products.map(product => product.id);

    // je récupère les prix des produits à partir des IDs
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true }
    });

    // Je vérifie si tous les produits existent dans la base de données
    if (products.length !== productIds.length) {
      return res.status(400).json({ message: 'Certains produits n\'existent pas' });
    }

    // Je calcule le coût total de la commande en additionnant les prix des produits
    const totalPrice = products.reduce((total, product) => total + product.price, 0);

    // Je créée la commande dans la base de données
    const order = await prisma.order.create({
      data: {
        consummerId: Number(userId),
        cartId: parseInt(cartId),
        productIds: String(productIds), // je convertis le cartId en nombre
        price: totalPrice
      }
    });

    // Je retourne  l'ID de l'utilisateur, le coût total de la commande et l'ID de la commande nouvellement créée
    return res.status(201).json(order);
  } catch (error) {
    console.error('Erreur lors de la création de la commande :', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

//2.delete order (admin)
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prismaClient.order.delete({
      where: { id: Number(id) }
    });

    res.status(201).json({ message: 'Order removed' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//3.get all orders (admin)
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prismaClient.order.findMany();
    res.status(200).json({orders});
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

  //4. get order Details (admin)
  export const getOrderDetails = async (req: Request, res: Response) => {
    try {
      //  je récupère  l'ID de la commande à partir des paramètres de la requête
      const {id} = req.params;
  
      //  je récupère  les détails de la commande à partir de la base de données
      const orderDetails = await prismaClient.order.findUnique({
        where: { id: Number(id) }
      });
  
      if (!orderDetails) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      //  je récupère  la chaîne productIds de la commande
      const productIdsString = orderDetails.productIds;
  
      // je divise la chaîne productIds en un tableau d'IDs individuels
      const productIds = productIdsString.split(',').map(id => parseInt(id));
  
      //  je récupère  les informations sur les produits correspondants depuis la base de données
      const products = await prismaClient.product.findMany({
        where: { id: { in: productIds } }
      });
  
      // Je retourne  les détails de la commande avec les informations sur les produits
      return res.status(200).json({ orderDetails, products });
    } catch (error) {
      console.error('Error fetching order details:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };


//3.get my orders
export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] // J'obtiens le token a partir du header
    
    // Je vérifie si le token n'est pas fourni
    if (!token) {
      return res.status(401).json({ error: "Token non fourni. Vous devez être authentifié pour réaliser cette opération." });
    }

    // Je décode  le token JWT pour obtenir l'ID de l'utilisateur
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number };

    //  je récupère  l'ID de l'utilisateur depuis le token
    const userId = decodedToken.userId;

    //  je récupère  les commandes de l'utilisateur à partir de son userId
    const orders = await prisma.order.findMany({
      where: {
        consummerId: userId, // Je filtre par l'ID de l'utilisateur
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    res.status(400).json({ error: 'token invalid' });
  }
};

//6: get my order details
export const getMyOrderDetails = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] // J'obtiens le token a partir du header
    const {id} = req.params; // Récupérer l'ID de la commande à partir des paramètres de la requête
    

    //  je récupère  les détails de la commande à partir de la base de données
    const orderDetails = await prismaClient.order.findUnique({
      where: { id: Number(id) }
    });

    if (!orderDetails) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (!token) {
      return res.status(401).json({ error: "Token non fourni. Vous devez être authentifié pour réaliser cette opération." });
    }

    // Je décode  le token JWT pour obtenir l'ID de l'utilisateur
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };

    //  je récupère  l'ID de l'utilisateur depuis le token
    const userId = decodedToken.userId;

    const user = await prismaClient.user.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        id: true,
      },
    }); // je recherche l'id dans la base de données

    // Je vérifie si l'ID de l'utilisateur extrait du token JWT correspond à l'ID de l'utilisateur dans la requête
    if (orderDetails.consummerId !== user?.id) {
      return res.status(400).json({ error: 'Désolé, vous ne pouvez pas accéder à cette ressource.' });
    }


    //  je récupère  la chaîne productIds de la commande
    const productIdsString = orderDetails.productIds;

    // je divise  la chaîne productIds en un tableau d'IDs individuels
    const productIds = productIdsString.split(',').map(id => parseInt(id));

    //  je récupère  les informations sur les produits correspondants depuis la base de données
    const products = await prismaClient.product.findMany({
      where: { id: { in: productIds } }
    });

    // Je retourne  les détails de la commande avec les informations sur les produits
    return res.status(200).json({ orderDetails, products });
  } catch (error) {
    console.error('Error fetching order details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteMyOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1] // J'obtiens le token a partir du header

    if (!token) {
      return res.status(401).json({ error: "Token non fourni. Vous devez être authentifié pour réaliser cette opération." });
    }

    // Je décode  le token JWT pour obtenir l'ID de l'utilisateur
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };

    //  je récupère  l'ID de l'utilisateur depuis le token
    const userId = decodedToken.userId;

    const user = await prismaClient.user.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        id: true,
      },
    }); 
    
    // je recherche dans la bdd la commande qui correspond à l'id passé en parametre

    const order = await prismaClient.order.delete({
      where: { id: Number(id) }
    });

    // Je vérifie si l'ID de l'utilisateur extrait du token JWT correspond à l'ID de l'utilisateur dans la requête
    if (order.consummerId !== user?.id) {
      return res.status(400).json({ error: 'Désolé, vous ne pouvez pas accéder à cette ressource.' });
    }

    res.status(201).json({ message: 'Order removed' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};





