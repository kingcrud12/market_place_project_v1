import {Request, Response, NextFunction} from "express"
import { PrismaClient, ROLE} from "@prisma/client"
import { prismaClient } from "../../start/start"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../secret"
import upload from '../../start/upload';

export const createProduct = [
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { name, description, price } = req.body;

    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Token non fourni. Vous devez être authentifié pour accéder à cette ressource.' });
      }

      const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };
      const userId = decodedToken.userId;

      const imageUrl = req.file ? `https://localhost:3000/uploads/${req.file.filename}` : null;

      if (!name || !description || !price || !imageUrl) {
        return res.status(400).json({ message: 'Erreur, propriétés manquantes ou image non fournie' });
      }

      let product = await prismaClient.product.findFirst({ where: { name } });
      if (product) {
        return res.status(400).json({ error: 'Le produit existe déjà' });
      }

      product = await prismaClient.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          imageUrl, // Ajouter l'URL de l'image au produit
          authorId: Number(userId),
        },
      });

      res.json(product);
    } catch (error) {
      console.log('Erreur dans le controller', { error });
      return res.status(500).json({ error });
    }
  },
];

// Exemple pour la mise à jour d'un produit
export const updateProduct = [
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    try {
      const imageUrl = req.file ? `https://localhost:3000/uploads/${req.file.filename}` : null;

      const dataToUpdate: any = {
        name,
        description,
        price: parseFloat(price),
      };

      if (imageUrl) {
        dataToUpdate.imageUrl = imageUrl;
      }

      const product = await prismaClient.product.update({
        where: { id: parseInt(id) },
        data: dataToUpdate,
      });

      res.json({ message: 'Produit mis à jour avec succès', product });
    } catch (error) {
      console.log('Erreur lors de la mise à jour du produit', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },
];

//3.get all Products
export const getProducts = async (req: Request, res: Response) => {
    try {
      const products = await prismaClient.product.findMany();
      res.status(200).json({products});
    } catch (e) {
      res.status(500).json({ error: e });
    }
  };

 //4. get a single product
 export const getSingleProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await prismaClient.product.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(product);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  };

  //5.delete a product (admin)
  export const deleteProduct = async(req: Request, res: Response) =>{
    try {
      const {id} = req.params;
      
      const product = await prismaClient.product.delete({
        where: { id: Number(id) }
      });
      
      res.json({ message: 'Product removed' });
    } catch (error) {
      res.status(500).json({ error: "Interal server error"});
    }
  }