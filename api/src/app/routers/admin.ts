import { Router } from "express";
import { deleteUser,getUserFromAdminCredentials,getUsers, login} from "../controllers/auth";
import { isAdmin, isAdminByEmail } from "../middlewares/auth";
import { createProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from "../controllers/products";
import { deleteOrder, getOrderDetails, getOrders } from "../controllers/orders";

const admin = Router()

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Routes pour les administrateurs
 */

/**
 * @swagger
 * /admin/user/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       403:
 *         description: Accès refusé
 */
admin.delete("/user/:id", isAdmin, deleteUser);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *       403:
 *         description: Accès refusé
 */
admin.get("/users", isAdmin, getUsers);

/**
 * @swagger
 * /admin/user/{id}:
 *   get:
 *     summary: Récupérer les informations d'un utilisateur
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *       403:
 *         description: Accès refusé
 */
admin.get("/user/:id", isAdmin, getUserFromAdminCredentials);

// Routes pour les produits

/**
 * @swagger
 * /admin/product:
 *   post:
 *     summary: Créer un nouveau produit
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *       400:
 *         description: Données invalides
 *       403:
 *         description: Accès refusé
 */
admin.post("/product", isAdmin, createProduct);

/**
 * @swagger
 * /admin/product/{id}:
 *   put:
 *     summary: Mettre à jour un produit
 *     tags: [Admin]
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
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *       404:
 *         description: Produit non trouvé
 *       400:
 *         description: Données invalides
 *       403:
 *         description: Accès refusé
 */
admin.put("/product/:id", isAdmin, updateProduct);

/**
 * @swagger
 * /admin/product/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 *       403:
 *         description: Accès refusé
 */
admin.delete("/product/:id", isAdmin, deleteProduct);

/**
 * @swagger
 * /admin/products:
 *   get:
 *     summary: récupérer tous les produits
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produits récupérés avec succès
 *       400:
 *         description: Données invalides
 *       403:
 *         description: Accès refusé
 */
admin.get("/products", isAdmin, getProducts);

admin.get("/product/:id", isAdmin, getSingleProduct);

admin.post("/login",isAdminByEmail, login);

// Routes pour les commandes

/**
 * @swagger
 * /admin/order/{id}:
 *   delete:
 *     summary: Supprimer une commande
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commande supprimée avec succès
 *       404:
 *         description: Commande non trouvée
 *       403:
 *         description: Accès refusé
 */
admin.delete("/order/:id", isAdmin, deleteOrder);

/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: Récupérer toutes les commandes
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des commandes récupérée avec succès
 *       403:
 *         description: Accès refusé
 */
admin.get("/orders", isAdmin, getOrders);

/**
 * @swagger
 * /admin/order/{id}:
 *   get:
 *     summary: Récupérer les détails d'une commande
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de la commande récupérés avec succès
 *       404:
 *         description: Commande non trouvée
 *       403:
 *         description: Accès refusé
 */
admin.get("/order/:id", isAdmin, getOrderDetails);

export default admin;