import { Router } from "express";
import {getProducts, getSingleProduct, updateProduct } from "../controllers/products";
import { isAuthenticated } from "../middlewares/auth";
import { createOrder, deleteMyOrder, getMyOrderDetails, getMyOrders } from "../controllers/orders";
import { addItemToCart, addToCart, getCart, removeItemToCart } from "../controllers/cart";

const shop = Router()

//shop products routes
shop.get("/products", getProducts)
shop.get("/product/:id", getSingleProduct)

//shop orders user
shop.post("/order", isAuthenticated, createOrder)
shop.get("/myOrders", getMyOrders)
shop.get("/myOrderDetails/:id", getMyOrderDetails)
shop.delete("/myOrder/:id", deleteMyOrder)

//shop carts user
shop.post("/cart",isAuthenticated, addToCart)
shop.post("/cart/:cartId/:id", addItemToCart)
shop.delete("/cart/Item/:cartId/:productIds", removeItemToCart)
shop.get("/myCart/:cartId/:id", getCart)


export default shop