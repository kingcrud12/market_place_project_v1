import { Router } from "express";
import { createOrder, deleteOrder, getOrderDetails, getOrders } from "../controllers/orders";
import { isAdmin, isAuthenticated } from "../middlewares/auth";

const adminOrders = Router()

adminOrders.delete("/order/:id", isAdmin, deleteOrder)

adminOrders.get("/", isAdmin, getOrders)

adminOrders.get("/orderDetails/:id", isAdmin, getOrderDetails)


export default adminOrders