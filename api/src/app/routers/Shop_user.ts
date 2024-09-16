import { Router } from "express";
import {getProducts, getSingleProduct, updateProduct } from "../controllers/products";
import { isAuthenticated, isTokenValid, } from "../middlewares/auth";
import { createOrder, deleteMyOrder, getMyOrderDetails, getMyOrders } from "../controllers/orders";
import { addItemToCart, addToCart, getAllCarts, getCart, removeItemToCart } from "../controllers/cart";

const Shop_user = Router()

/**
 * @swagger
 * tags:
 *   name: Shop_User
 *   description: Routes pour les utilisateurs du shop
 */

/**
 * @swagger
 * /shop/products:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Shop_User]
 *     responses:
 *       200:
 *         description: Liste des produits récupérée avec succès
 */
Shop_user.get("/products", getProducts);

/**
 * @swagger
 * /shop/product/{id}:
 *   get:
 *     summary: Récupérer un produit par ID
 *     tags: [Shop_User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produit récupéré avec succès
 *       404:
 *         description: Produit non trouvé
 */
Shop_user.get("/product/:id", getSingleProduct);

// Routes pour les commandes utilisateur

/**
 * @swagger
 * /shop/user/order:
 *   post:
 *     summary: Créer une nouvelle commande
 *     tags: [Shop_User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *       400:
 *         description: Données invalides
 */
Shop_user.post("/user/order", isTokenValid, createOrder);

/**
 * @swagger
 * /shop/user/Orders:
 *   get:
 *     summary: Récupérer les commandes de l'utilisateur
 *     tags: [Shop_User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des commandes récupérée avec succès
 *       403:
 *         description: Accès refusé
 */
Shop_user.get("/user/Orders", isTokenValid, getMyOrders);

/**
 * @swagger
 * /shop/user/OrderDetails/{id}:
 *   get:
 *     summary: Récupérer les détails d'une commande
 *     tags: [Shop_User]
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
 */
Shop_user.get("/user/OrderDetails/:id/:cartId",isTokenValid, getMyOrderDetails);

/**
 * @swagger
 * /shop/user/Order/{id}:
 *   delete:
 *     summary: Supprimer une commande de l'utilisateur
 *     tags: [Shop_User]
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
 */
Shop_user.delete("/user/Order/:id",isTokenValid, deleteMyOrder);

// Routes pour le panier utilisateur

/**
 * @swagger
 * /shop/user/cart:
 *   post:
 *     summary: créer un panier
 *     tags: [Shop_User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produit ajouté au panier avec succès
 *       400:
 *         description: Données invalides
 */
Shop_user.post("/user/cart", isTokenValid, addToCart);

/**
 * @swagger
 * /shop/user/cart/{cartId}/{id}:
 *   post:
 *     summary: Ajouter un produit au panier spécifié
 *     tags: [Shop_User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produit ajouté au panier avec succès
 *       400:
 *         description: Données invalides
 */
Shop_user.put("/user/cart/:cartId/:id", isTokenValid, addItemToCart);

/**
 * @swagger
 * /shop/user/cart/Item/{cartId}/{productIds}:
 *   delete:
 *     summary: Supprimer un produit du panier
 *     tags: [Shop_User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: productIds
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produit supprimé du panier avec succès
 *       404:
 *         description: Produit ou panier non trouvé
 */
Shop_user.delete("/user/cart/Item/:cartId/:productIds",isTokenValid, removeItemToCart);

/**
 * @swagger
 * /shop/user/Cart/{cartId}/{id}:
 *   get:
 *     summary: Récupérer un panier de l'utilisateur
 *     tags: [Shop_User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Panier récupéré avec succès
 *       404:
 *         description: Panier ou produit non trouvé
 */
Shop_user.get("/user/cart/:cartId/:id", isTokenValid, getCart);

Shop_user.get('/user/carts', isTokenValid, getAllCarts);





export default Shop_user