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

        // Vérifier si le token est dans la blacklist
       const tokenBlacklisted = await prismaClient.blacklist.findUnique({
        where: {
          token: token,
        },
      });

      if (tokenBlacklisted) {
        return res.status(403).json({ message: "Token invalide. Veuillez vous reconnecter." });
      }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              return res.status(401).json({ error: 'Token expiré. Veuillez vous reconnecter.' });
            } else {
              return res.status(403).json({ error: 'Token invalide. Veuillez vous reconnecter.' });
            }
          }
        });

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

export const isTokenValid = async(req: Request, res: Response, next: NextFunction)=>{
  try{
      const token = req.headers.authorization?.split(' ')[1]
      if(!token){
          return res.status(401).json({error: "Token non fourni. Vous devez être authentifié pour accéder à cette ressource."})
      }

       // Vérifier si le token est dans la blacklist
       const tokenBlacklisted = await prismaClient.blacklist.findUnique({
        where: {
          token: token,
        },
      });
      
      if (tokenBlacklisted) {
        return res.status(403).json({ message: "Token invalide. Veuillez vous reconnecter." });
      }
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expiré. Veuillez vous reconnecter.' });
          } else {
            return res.status(403).json({ error: 'Token invalide. Veuillez vous reconnecter.' });
          }
        }
      });

      next()
  } catch(error){
      console.log("Erreur dans le middleware isTokenValid", {error})
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
  
  export const isAdminByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email non fourni. Vous devez fournir un email pour vérifier les permissions." });
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            },
            select: {
                role: true
            }
        });

        if (!user || user.role !== "ADMIN") {
            return res.status(403).json({ error: "Vous n'avez pas les permissions nécessaires pour accéder à cette ressource." });
        }

        next();
    } catch (error) {
        console.error("Erreur dans le middleware isAdminByEmail", { error });
        return res.status(500).json({ error: "Erreur interne du serveur." });
    }
};