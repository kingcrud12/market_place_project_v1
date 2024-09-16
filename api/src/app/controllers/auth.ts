import { Request, Response } from "express"
import { prismaClient } from "../../start/start"
import {hashSync, compareSync} from "bcrypt"
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../secret"
import { sendConfirmationEmail } from "../../mailer"
import { Jwt } from "jwt-destroy"


//1. création de compte
export const signup = async (req: Request, res: Response) =>{
    const {email, password, confirmEmail, name} = req.body

    if(email !== confirmEmail){
      return res.status(400).json({ message: "L'email et la confirmation d'email ne correspondent pas." });
    }

    let user = await prismaClient.user.findFirst({where: {email}})
    if (user){
      return res.status(400).json({message: "cet utilisateur existe déjà"})
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


    const confirmationLink = `http://localhost:3000/market_place/v1/auth/confirm-email?token=${token}`;
    await sendConfirmationEmail(email, 'Confirm your account', `Please confirm your account by clicking the following link: ${confirmationLink}`);


    res.status(201).json({user: name, email})
}

//2. demander un nouveau lien de confirmation de compte
export const askconfirmationLink = async (req: Request, res: Response) =>{
  const {email} = req.body
  try {
    const token = req.headers.authorization?.split(' ')[1] // J'obtiens le token à partir des en-têtes
    
  
    if (!token) {
      return res.status(401).json({ error: "Token non fourni. Vous devez être authentifié pour réaliser cette opération." });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET) as { email: string };

    //je récupère  l'ID de l'utilisateur depuis le token
    const emailfound = decodedToken.email;

    if (email !== emailfound) {
      return res.status(403).json({ error: "L'adresse e-mail ne correspond pas à celle de l'utilisateur connecté." });
    }

    //  je récupère  l'utilisateur a travers son id'
    const userFound = await prismaClient.user.findUnique({
      where: {
        email: emailfound, // Je filtre par l'ID de l'utilisateur
      },
      select: {
        id: true,
        email: true,
        name: true,
    }
    });

    const confirmationLink = `http://localhost:3000/market_place/v1/auth/confirm-email?token=${token}`;
    await sendConfirmationEmail(email, 'Confirm your account', `Please confirm your account by clicking the following link: ${confirmationLink}`);

    res.status(201).json({message : "lien envoyé"});
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    res.status(500).json(error);
  }
}

//3.connexion au compte
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
        expiresIn: '7h'
    })
    
    res.json({user: user.id, email, token})
}

//3. déconnexion
export const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  // Vérification si le token est fourni
  if (!token) {
    return res.status(401).json({ message: "Token non fourni, vous devez être authentifié pour accéder à cette ressource." });
  }

  try {
    // Ajoute le token à une table de blacklist ou une autre structure de stockage pour l'invalider
    await prismaClient.blacklist.create({
      data: {
        token: token, // Enregistre le token dans une table `blacklist`
      },
    });

    return res.status(201).json({ message: "Vous avez été déconnecté avec succès, token invalidé." });
  } catch (error) {
    console.error("Erreur lors de la déconnexion", error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};


//4. getUsers(admin)
export const getUsers = async (req: Request, res: Response) => {
    try {
      const users = await prismaClient.user.findMany();
      res.status(200).json({users});
    } catch (e) {
      res.status(500).json({ error: e });
    }
  };

//5. getUser(admin)
export const getUserFromAdminCredentials = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id:  Number(id), // Je filtre par l'ID de l'utilisateur
      },
      select: {
        id: true,
        email: true,
        name: true,
    }
    });
    res.status(200).json({user});
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

//6. getUser
export const getUser = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1] // J'obtiens le token à partir des en-têtes
      
      // Je vérifie si le token n'est pas fourni
      if (!token) {
        return res.status(401).json({ error: "Token non fourni. Vous devez être authentifié pour réaliser cette opération." });
      }
  
      /* Je décode le token JWT pour obtenir l'ID de l'utilisateur

     /*if(!jwt.verify(token, JWT_SECRET)){
      return res.status(401).json({message : "token non valide"})
     }*/

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


  export const requestPasswordReset = async (req: Request, res: Response) => {
    const { email } = req.body; // Récupérer l'email depuis le body de la requête
  
    try {
      // Vérifiez si l'utilisateur existe
      const user = await prismaClient.user.findUnique({ where: { email } }); // Rechercher par email
  
      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable." });
      }
  
      // Génération du token de réinitialisation (valable par exemple 1h)
      const resetToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  
      // Envoi de l'e-mail avec le lien de réinitialisation
      const resetLink = `http://localhost:3001/reset-password/${user.id}?token=${resetToken}`;
      await sendConfirmationEmail(user.email, 'Réinitialisation du mot de passe', `Cliquez ici pour réinitialiser votre mot de passe: ${resetLink}`);
  
      return res.status(200).json({ message: 'Un e-mail de réinitialisation a été envoyé.' });
    } catch (error) {
      console.error('Erreur lors de la demande de réinitialisation de mot de passe:', error);
      return res.status(500).json({ message: 'Erreur interne du serveur.' });
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


export const resetUserPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Récupérer l'ID de l'utilisateur depuis l'URL
    const token = req.headers.authorization?.split(' ')[1]; // Récupération du token JWT
    const { password } = req.body; // Récupération du nouveau mot de passe

    if (!token) {
      return res.status(401).json({ error: "Token non fourni. Vous devez être authentifié pour réaliser cette opération." });
    }

    // Vérification du token et extraction de l'ID utilisateur
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decodedToken.userId;

    // Vérification que l'utilisateur existe et correspond à l'ID du token
    const user = await prismaClient.user.findUnique({
      where: { id: Number(userId) },
      select: { id: true, email: true },
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }

    if (id !== user.id.toString()) {
      return res.status(400).json({ error: 'Désolé, vous ne pouvez pas accéder à cette ressource.' });
    }

    // Vérification que le mot de passe est fourni
    if (!password) {
      return res.status(400).json({ error: 'Le mot de passe est requis.' });
    }

    // Hachage du mot de passe avant la mise à jour
    const hashedPassword = hashSync(password, 10);

    // Mise à jour du mot de passe dans la base de données
    await prismaClient.user.update({
      where: { id: parseInt(id) },
      data: { password: hashedPassword },
    });

    // Envoi d'un email de confirmation
    const subject = 'Votre mot de passe a été réinitialisé avec succès';
    const text = 'Bonjour, votre mot de passe a été modifié avec succès. Si vous n\'êtes pas à l\'origine de cette modification, veuillez contacter notre support immédiatement.';

    await sendConfirmationEmail(user.email, subject, text);

    return res.status(200).json({ message: 'Mot de passe réinitialisé avec succès, un email de confirmation a été envoyé.' });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};




  

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