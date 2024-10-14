import { Router } from 'express';
import { signup, login, logout, askconfirmationLink, getUser, updateUserInfo } from '../controllers/auth';
import { isAuthenticated, isTokenValid } from '../middlewares/auth';
import { confirmEmail } from '../controllers/confirmEmail';

const authRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Routes d'authentification
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Inscription d'un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides
 */
authRoutes.post("/signup", signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants incorrects
 */
authRoutes.post("/login", login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Déconnexion d'un utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *       401:
 *         description: Token manquant ou invalide
 */
authRoutes.post("/logout", logout);

/**
 * @swagger
 * /auth/confirm-email:
 *   get:
 *     summary: Confirmation de l'email de l'utilisateur
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Email confirmé
 *       400:
 *         description: Lien de confirmation invalide
 */
authRoutes.get('/confirm-email', confirmEmail);

/**
 * @swagger
 * /auth/confirm-email-link:
 *   post:
 *     summary: Demande d'un nouveau lien de confirmation
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: Lien de confirmation envoyé
 *       400:
 *         description: Erreur lors de l'envoi du lien
 */
authRoutes.post('/confirm-email-link', isTokenValid, askconfirmationLink);



export default authRoutes;
