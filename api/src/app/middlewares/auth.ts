import { JWT_SECRET } from "../../secret";
import { PrismaClient, ROLE } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prismaClient } from "../../start/start";

export const isAdmin = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1]
        if(!token){
            return res.status(401).json({error: "Token non fourni. Vous devez être authentifié pour accéder à cette ressource."})
        }

        const decodedToken = jwt.verify(token, JWT_SECRET) as {userId: string}

        const userId = decodedToken.userId

        const user = await prismaClient.user.findFirst({
            where: {
                id: Number(userId)
            },
            select: {
                role: true
            }
        })

        if(!user || user.role !== ROLE.ADMIN){
        return res.status(403).json({error: "vous n'avez pas les permissions nécessaires pour accéder à cette ressource."})
        }

        next()
    } catch(error){
        console.log("Erreur dans le middleware isAdmin", {error})
        return res.status(500).json({error: {error}})
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const isValidTokenFormat = (token: string): boolean => {
      const tokenParts = token.split('.');
      return tokenParts.length === 3;
    };
    try {
      // je récupère le token des en-têtes
      const token = req.headers.authorization?.split(' ')[1]
  
      console.log(token)
      
      if (!token) {
        return res.status(401).json({ error: "Token non fourni. Vous devez être authentifié pour accéder à cette ressource." });
      }
  
      if (!isValidTokenFormat(token)) {
        return res.status(401).json({ error: "Format de token invalide, l'utilisateur n'est pas connecté." });
      }
  
      // je décode le token JWT pour obtenir l'ID de l'utilisateur
      const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };
  
      // je récupère l'ID de l'utilisateur depuis le token
      const userId = decodedToken.userId;
  
    
      const user = await prismaClient.user.findUnique({
        where: {
          id: Number(userId),
        },
        select: {
          id: true,
        },
      });
      if(!user){
        return res.status(401).json({message: "Désolé vous n'êtes pas autorisé d'accéder à cette ressource"})
      }
      next();
    } catch (error) {
      console.error('Erreur dans le middleware isAdmin:', error);
      return res.status(500).json({ error: 'token non valide' });
    }
  };  