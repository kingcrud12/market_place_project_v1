import { Router } from "express";
import { getUser, requestPasswordReset, resetUserPassword, updateUserInfo } from "../controllers/auth";
import { isAuthenticated, isTokenValid } from "../middlewares/auth";

const User = Router()

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Routes pour la gestion des informations utilisateur
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *       401:
 *         description: Non autorisé, authentification requise
 */
User.get("/", isTokenValid, getUser);

/**
 * @swagger
 * /user/profile/{id}:
 *   put:
 *     summary: Mettre à jour les informations de profil de l'utilisateur
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur mises à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé, authentification requise
 */
User.put("/profile/:id", isTokenValid, updateUserInfo);

User.post("/reset-password", requestPasswordReset);

User.put("/reset-password/:id", resetUserPassword);

export default User 