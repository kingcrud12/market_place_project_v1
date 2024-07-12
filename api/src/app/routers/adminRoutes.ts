import { Router } from "express";
import { deleteUser,getUsers} from "../controllers/auth";
import { isAdmin } from "../middlewares/auth";
import {createProduct, deleteProduct, updateProduct} from "../controllers/products";
import adminProducts from "./adminProducts";
import {deleteOrder, getOrderDetails, getOrders} from "../controllers/orders";
import adminOrders from "./adminOrders";

const adminRoutes = Router()

// admin routes to manage users
adminRoutes.delete("/user/:id", isAdmin, deleteUser)
adminRoutes.get("/users", isAdmin, getUsers)


//admin routes to manage products
adminRoutes.post("/product",isAdmin, createProduct)
adminRoutes.put("/product/profile/:id",isAdmin, updateProduct)
adminRoutes.delete("/product/:id",isAdmin, deleteProduct)

//admin routes to manage orders
adminRoutes.get("/", isAdmin, getOrders)
adminRoutes.get("/orderDetails/:id", isAdmin, getOrderDetails)
adminRoutes.delete("/order/:id", isAdmin, deleteOrder)


export default adminRoutes