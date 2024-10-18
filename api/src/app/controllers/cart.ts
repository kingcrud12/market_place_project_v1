import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../secret';
import { prismaClient } from '../../start/start';

const prisma = new PrismaClient();

//1. création d'un panier
export const addToCart = async (req: Request, res: Response) => {
  try {
    // console.log du body pour debug
    console.log('Request body:', req.body);

    // je recupère les noms et les ids des produits à partir du coprs de la requête
    const products: { name: string, id: number, quantity: number }[] = req.body.products;

    // je vérifie si les produits ont été bien ajoutés et si le tableau est dans un bon format
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products are required in the request body' });
    }

    // je récupère le token depuis les en-têtes
    const token = req.headers.authorization?.split(' ')[1];

    // je vérifie si le token a bien été fourni
    if (!token) {
      return res.status(401).json({ error: "Token not provided. You must be authenticated to perform this operation." });
    }

    // je récupère l'id de l'utilisateur depuis le token
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number };
    const userId = decodedToken.userId;

    // je recherche l'utilisateur a partir de son token dans la bdd
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    // si l'utilisateur n'existe pas, je retourne cette erreur
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // je récupère tous les produits uniques par leurs IDS
    const uniqueProductIds = Array.from(new Set(products.map(product => product.id)));
    const fetchedProducts = await prismaClient.product.findMany({
      where: { id: { in: uniqueProductIds } },
      select: { id: true, name: true, price: true }
    });

    // debug
    console.log('Unique Product IDs:', uniqueProductIds);
    console.log('Fetched Products:', fetchedProducts);

    // Je vérifie si chaque produit unique existe dans la bdd
    if (fetchedProducts.length !== uniqueProductIds.length) {
      return res.status(400).json({ message: 'Some products do not exist' });
    }

    // je crée un nouveau panier
    const cart = await prismaClient.cart.create({
      data: {
        consummerId: userId,
      },
      select: {
        id: true,
        products: {
          select: {
            id: true,
            productId: true 
          }
        },
        createdAt: true,
        updatedAt: true
      },
    });

    // J'ajoute des produits dans le panier
    for (const product of products) {
      await prismaClient.cartProduct.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          quantity: product.quantity, // Ajout de la quantité
        }
      });
    }

    // je mets à jour le panier
    const updatedCart = await prismaClient.cart.findUnique({
      where: { id: cart.id },
      select: {
        id: true,
        products: {
          select: {
            id: true,
            productId: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              }
            }
          }
        },
        createdAt: true,
        updatedAt: true
      }
    });

    //je retourne le panier mis à jour
    res.json(updatedCart);

  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'An error occurred while adding to the cart' });
  }
};


export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;
    const { products } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Token not provided. You must be authenticated to perform this operation." });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number };
    const userId = decodedToken.userId;

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user || user.id !== userId) {
      return res.status(400).json({ error: 'Sorry, you cannot access this resource.' });
    }

    if (!cartId) {
      return res.status(400).json({ message: 'Cart ID is required' });
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products are required in the request body' });
    }

    // Vérification du stock pour chaque produit
    for (const { id, quantity } of products) {
      const product = await prismaClient.product.findUnique({
        where: { id },
        select: { stock: true },
      });

      if (!product) {
        return res.status(404).json({ message: `Product with id ${id} not found` });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ message: `Insufficient stock for product ${id}. Available stock: ${product.stock}` });
      }

      // Vérifier si le produit est déjà dans le panier
      const existingCartProduct = await prismaClient.cartProduct.findFirst({
        where: {
          cartId: parseInt(cartId),
          productId: id,
        },
      });

      if (existingCartProduct) {
        // Si le produit existe déjà dans le panier, on augmente la quantité
        await prismaClient.cartProduct.update({
          where: { id: existingCartProduct.id },
          data: {
            quantity: existingCartProduct.quantity + quantity,
          },
        });
      } else {
        // Si le produit n'est pas dans le panier, on l'ajoute
        await prismaClient.cartProduct.create({
          data: {
            cartId: parseInt(cartId),
            productId: id,
            quantity: quantity,
          },
        });
      }
    }

    // Récupérer le panier mis à jour
    const updatedCart = await prismaClient.cart.findUnique({
      where: { id: parseInt(cartId) },
      select: {
        id: true,
        products: {
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              }
            }
          }
        },
        createdAt: true,
        updatedAt: true
      }
    });

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};




// controller permettant de supprimer les articles du panier
export const removeItemToCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Token not provided. You must be authenticated to perform this operation." });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number };
    const userId = decodedToken.userId;

    if (!cartId) {
      return res.status(400).json({ message: 'Cart ID is required' });
    }

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required in the request body' });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'A valid quantity is required' });
    }

    // Récupérer le produit du panier
    const cartProduct = await prismaClient.cartProduct.findFirst({
      where: {
        cartId: parseInt(cartId),
        productId: parseInt(productId)
      }
    });

    if (!cartProduct) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Vérifier si la quantité à retirer est inférieure à celle dans le panier
    if (cartProduct.quantity > quantity) {
      // Réduire la quantité
      await prismaClient.cartProduct.update({
        where: { id: cartProduct.id },
        data: {
          quantity: cartProduct.quantity - quantity
        }
      });
    } else {
      // Supprimer le produit du panier s'il ne reste plus d'unités
      await prismaClient.cartProduct.delete({
        where: { id: cartProduct.id }
      });
    }

    // Vérifier si le panier est vide après suppression
    const remainingProducts = await prismaClient.cartProduct.findMany({
      where: {
        cartId: parseInt(cartId)
      }
    });

    if (remainingProducts.length === 0) {
      // Supprimer le panier s'il est vide
      await prismaClient.cart.delete({
        where: { id: parseInt(cartId) }
      });
      return res.status(200).json({ message: 'Cart has been deleted as it was empty' });
    }

    // Récupérer le panier mis à jour
    const updatedCart = await prismaClient.cart.findUnique({
      where: { id: parseInt(cartId) },
      select: {
        id: true,
        products: {
          select: {
            id: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              }
            }
          }
        },
        createdAt: true,
        updatedAt: true
      }
    });

    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};




// controller permettant d'afficher un panier
export const getCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Token not provided. You must be authenticated to perform this operation." });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number }; // décode le token pour en retirer l'id
    const userId = decodedToken.userId;

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user || user.id !== userId) {
      return res.status(400).json({ error: 'Sorry, you cannot access this resource.' });
    }

    if (!cartId) {
      return res.status(400).json({ message: 'Cart ID is required' });
    }

    // Fetch the cart from the database
    const cart = await prismaClient.cart.findUnique({
      where: { id: parseInt(cartId) },
      select: {
        id: true,
        products: {
          select: {
            id: true,
            productId: true,
            quantity:true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            }
          }
        },
        createdAt: true,
        updatedAt: true
      }
    });

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllCarts = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Token not provided. You must be authenticated to perform this operation." });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number }; // Décode le token pour obtenir l'id utilisateur
    const userId = decodedToken.userId;

    // Récupère tous les paniers de l'utilisateur
    const carts = await prismaClient.cart.findMany({
      where: { consummerId: userId },
      select: {
        id: true,
        products: {
          select: {
            id: true,
            productId: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                imageUrl: true
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json(carts);
  } catch (error) {
    console.error('Error fetching all carts:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
