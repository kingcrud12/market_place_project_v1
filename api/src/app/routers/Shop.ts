import { Router } from "express";
import {getProducts, getSingleProduct, updateProduct } from "../controllers/products";
import { isAuthenticated } from "../middlewares/auth";
import { createOrder, deleteMyOrder, getMyOrderDetails, getMyOrders } from "../controllers/orders";
import { addItemToCart, addToCart, getCart, removeItemToCart } from "../controllers/cart";

const Shop = Router()

//shop products routes
Shop.get("/products", getProducts)
Shop.get("/product/:id", getSingleProduct)

//shop orders user
Shop.post("/user/order", isAuthenticated, createOrder)
Shop.get("/user/myOrders", getMyOrders)
Shop.get("/user/myOrderDetails/:id", getMyOrderDetails)
Shop.delete("/user/myOrder/:id", deleteMyOrder)

//shop carts user
Shop.post("/cart",isAuthenticated, addToCart)
Shop.post("/cart/:cartId/:id", addItemToCart)
Shop.delete("/cart/Item/:cartId/:productIds", removeItemToCart)
Shop.get("/myCart/:cartId/:id", getCart)


export default Shop