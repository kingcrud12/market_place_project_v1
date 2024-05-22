import { Request, Response } from "express"
import { prismaClient } from "../../start/start"
import {hashSync, compareSync} from "bcrypt"
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../secret"
import { sendConfirmationEmail } from "../../mailer"

//1. création de compte
export const signup = async (req: Request, res: Response) =>{
    const {email, password, name} = req.body

    let user = await prismaClient.user.findFirst({where: {email}})
    if (user){
      return res.status(400).json({message: "user already exists"})
    }
    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    })

    const token = jwt.sign({
      email : user.email
  }, JWT_SECRET, {
      expiresIn: '30m'
  })


    const confirmationLink = `http://localhost:3000/api/market_place/v1/auth/confirm-email?token=${token}`;
    await sendConfirmationEmail(email, 'Confirm your account', `Please confirm your account by clicking the following link: ${confirmationLink}`);


    res.status(200).json({user: name, email})
}

//2.connexion au compte
export const login = async (req: Request, res: Response) =>{
    const {email, password} = req.body

    let user = await prismaClient.user.findFirst({where: {email}})
    if (!user){
        return res.status(400).json({message: "user does not exist"})
    }
    if(!compareSync(password, user.password)){
        return res.status(400).json({message: "password is incorrect"})
    }

    const token = jwt.sign({
        userId : user.id,
        email: user.email
    }, JWT_SECRET, {
        expiresIn: '30m'
    })
    
    res.json({user: user.id, email, token})
}

//3. déconnexion
export const logout = async(req: Request, res: Response) =>{
    try{
        return res.status(200).json({message: "vous avez déconnecté avec succès"})
    } catch(error){
        console.error("Erreur lors de la déconnexion", error)
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}

//4. getUsers(admin)
export const getUsers = async (req: Request, res: Response) => {
    try {
      const users = await prismaClient.user.findMany();
      res.status(200).json({users});
    } catch (e) {
      res.status(500).json({ error: e });
    }
  };

//5. getUser
export const getUser = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1] // J'obtiens le token à partir des en-têtes
      
      // Je vérifie si le token n'est pas fourni
      if (!token) {
        return res.status(401).json({ error: "Token non fourni. Vous devez être authentifié pour réaliser cette opération." });
      }
  
      // Je décode le token JWT pour obtenir l'ID de l'utilisateur
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
      }); // je recherche un utilisateur dans la bdd dont l'id correspond à celui récupéré dans le token

  
      //  je récupère  l'utilisateur a travers son id'
      const userFind = await prismaClient.user.findUnique({
        where: {
          id: userId, // Je filtre par l'ID de l'utilisateur
        },
        select: {
          id: true,
          email: true,
          name: true,
          // Ajouter d'autres champs que vous souhaitez inclure ici
          // Assurez-vous de ne pas inclure 'password' et 'token'
      }
      });
  
      res.status(200).json(userFind);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      res.status(500).json(error);
    }
  };
  

  //6. updateUser info
  export const updateUserInfo= async (req: Request, res: Response)=> {
    try {
      const {id} = req.params
      const token = req.headers.authorization?.split(' ')[1] // J'obtiens le token à partir du header
  
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
      }); // je recherche l'id dans la base de données
  
      // Je vérifie si l'ID de l'utilisateur extrait du token JWT correspond à l'ID de l'utilisateur dans la requête
      if (id !== user?.id.toString()) {
        return res.status(400).json({ error: 'Désolé, vous ne pouvez pas accéder à cette ressource.' });
      }

      const { name, email, password } = req.body
  
      
      const userUpdated = await prismaClient.user.update({
        where: { id: parseInt(id) },
        data: { name, email, password: hashSync(password, 15)},
      });
  
      res.status(201).json({ message: 'info updated successfully' });
    } catch (error) {
      res.status(500).json({ message: "Interal server error", error});
    }
  }

  

  //7. deleteUser(admin)
  export const deleteUser = async(req: Request, res: Response) =>{
    try {
      const {id} = req.params;
      
      const product = await prismaClient.user.delete({
        where: { id: Number(id) }
      });
      
      res.json({ message: 'User removed' });
    } catch (error) {
      res.status(500).json({ error: "Interal server error"});
    }
  }