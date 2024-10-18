import { Router } from "express";
import {getProducts, getSingleProduct, updateProduct } from "../controllers/products";

const Shop = Router()

/**
 * @swagger
 * tags:
 *   name: Shop
 *   description: Routes pour la gestion des produits dans le shop
 */

/**
 * @swagger
 * /shop/products:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Shop]
 *     responses:
 *       200:
 *         description: Liste des produits récupérée avec succès
 */
Shop.get("/products", getProducts);

/**
 * @swagger
 * /shop/product/{id}:
 *   get:
 *     summary: Récupérer un produit par ID
 *     tags: [Shop]
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
Shop.get("/product/:id", getSingleProduct);

export default Shop