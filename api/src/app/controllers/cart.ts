import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../secret';
import { prismaClient } from '../../start/start';

const prisma = new PrismaClient();

//1. create a cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    // je récupère les IDs des produits depuis le corps de la requête
    const productIds: string[] = req.body.productId;

    // je vérifie si les productIds sont fournis dans le corps de la requête
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ message: 'Product IDs are required in the request body' });
    }

    // je récupère les des produits à partir de la base de données
    const products = await prismaClient.product.findMany({
      where: { id: { in: productIds.map(id => parseInt(id)) } },
      select: { id: true, price: true }
    });

    // je vérifie si tous les produits existent dans la base de données
    if (products.length !== productIds.length) {
      return res.status(400).json({ message: 'Some products do not exist' });
    }

    // je créee le panier dans la base de données
    const cart = await prisma.cart.create({
      data: {
        products: {
          connect: productIds.map(productId => ({ id: Number(productId) }))
        }
      },
      // je sélectionne les champs que je souhaite renvoyer dans la réponse
      select: {
        id: true,
        products: {
          select: {
            id: true
          }
        },
        createdAt: true,
        updatedAt: true
      }
    });

    // je retourne avec l'ID de l'utilisateur, le coût total de la commande et l'ID de la commande nouvellement créée
    return res.status(201).json(cart);
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params; //  je récupère  l'identifiant du panier à mettre à jour
    const { productIds } = req.body; //  je récupère  les IDs des produits à ajouter ou supprimer
    const token = req.headers.authorization?.split(' ')[1]
    const { id } = req.params; 

    // Je vérifie si le token n'est pas fourni
    if (!token) {
      return res.status(401).json({ error: "Token non fourni. Vous devez être authentifié pour réaliser cette opération." });
    }

    // Je décode  le token JWT pour obtenir l'ID de l'utilisateur
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number };

    //je récupère  l'ID de l'utilisateur depuis le token
    const userId = decodedToken.userId;

    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    }); //je recherche l'id dans la base de données

    // Je vérifie si l'ID de l'utilisateur extrait du token JWT correspond à l'ID de l'utilisateur dans la requête
    if (id !== user?.id.toString()) {
      return res.status(400).json({ error: 'Désolé, vous ne pouvez pas accéder à cette ressource.' });
    }

    // Je vérifie si l'identifiant du panier est fourni dans la requête
    if (!cartId) {
      return res.status(400).json({ message: 'Cart ID is required' });
    }

    // Je vérifie si les IDs des produits sont fournis dans la requête
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ message: 'Product IDs are required in the request body' });
    }

    //  je récupère  les des produits à partir de la base de données
    const products = await prisma.product.findMany({
      where: { id: { in: productIds.map(id => parseInt(id)) } },
      select: { id: true, price: true }
    });

    // Je vérifie si tous les produits existent dans la base de données
    if (products.length !== productIds.length) {
      return res.status(400).json({ message: 'Some products do not exist' });
    }

    // Je mets à jour le panier dans la base de données
    const updatedCart = await prisma.cart.update({
      where: { id: parseInt(cartId) }, // Identifier le panier à mettre à jour
      data: {
        products: {
          connect: productIds.map(productId => ({ id: parseInt(productId) })) // Connecter les nouveaux produits
        }
      },
      // je sélectionne les champs que vous souhaitez renvoyer dans la réponse
      select: {
        id: true,
        products: {
          select: {
            id: true
          }
        },
        createdAt: true,
        updatedAt: true
      }
    });

    // Je retourne  le panier mis à jour
    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const removeItemToCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params; //  je récupère  l'identifiant du panier à mettre à jour
    const { productIds } = req.body; //  je récupère  les IDs des produits à ajouter ou supprimer
    const token = req.headers.authorization?.split(' ')[1]

    // Je vérifie si le token n'est pas fourni
    if (!token) {
      return res.status(401).json({ error: "Token non fourni. Vous devez être authentifié pour réaliser cette opération." });
    }

    // Je décode  le token JWT pour obtenir l'ID de l'utilisateur
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number };

    //je récupère  l'ID de l'utilisateur depuis le token
    const userId = decodedToken.userId;

    // Je vérifie si l'identifiant du panier est fourni dans la requête
    if (!cartId) {
      return res.status(400).json({ message: 'Cart ID is required' });
    }

    // Je vérifie si les IDs des produits sont fournis dans la requête
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ message: 'Product IDs are required in the request body' });
    }

    //  je récupère  les des produits à partir de la base de données
    const products = await prisma.product.findMany({
      where: { id: { in: productIds.map(id => parseInt(id)) } },
      select: { id: true, price: true }
    });

    // Je vérifie si tous les produits existent dans la base de données
    if (products.length !== productIds.length) {
      return res.status(400).json({ message: 'Some products do not exist' });
    }

    // Je mets à jour le panier dans la base de données
    const updatedCart = await prisma.cart.update({
      where: { id: parseInt(cartId) }, // Identifier le panier à mettre à jour
      data: {
        products: {
          disconnect: productIds.map(productId => ({ id: parseInt(productId) })) // Connecter les nouveaux produits
        }
      },
      // je sélectionne les champs que vous souhaitez renvoyer dans la réponse
      select: {
        id: true,
        products: {
          select: {
            id: true
          }
        },
        createdAt: true,
        updatedAt: true
      }
    });

    // Je retourne  le panier mis à jour
    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params; //je récupère  l'identifiant du panier à mettre à jour
    const token = req.headers.authorization?.split(' ')[1]
    const { id } = req.params; 

    // Je vérifie si le token n'est pas fourni
    if (!token) {
      return res.status(401).json({ error: "Token non fourni. Vous devez être authentifié pour réaliser cette opération." });
    }

    // Je décode  le token JWT pour obtenir l'ID de l'utilisateur
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };

    //je récupère  l'ID de l'utilisateur depuis le token
    const userId = decodedToken.userId;

    const user = await prismaClient.user.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        id: true,
      },
    }); // rechercher l'id dans la base de données

    // Vérifier si l'ID de l'utilisateur extrait du token JWT correspond à l'ID de l'utilisateur dans la requête
    if (id !== user?.id.toString()) {
      return res.status(400).json({ error: 'Désolé, vous ne pouvez pas accéder à cette ressource.' });
    }

    // Je vérifie si l'identifiant du panier est fourni dans la requête
    if (!cartId) {
      return res.status(400).json({ message: 'Cart ID is required' });
    }
    // Je mets à jour le panier dans la base de données
    const updatedCart = await prisma.cart.findFirst({
      where: { id: parseInt(cartId) }, // J'identifie le panier à mettre à jour
      // je sélectionne les champs que vous souhaitez renvoyer dans la réponse
      select: {
        id: true,
        products: {
          select: {
            id: true
          }
        },
        createdAt: true,
        updatedAt: true
      }
    });

    // Je retourne  le panier mis à jour
    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



