import { Router } from "express";
import {getUser, login, logout, signup, updateUserInfo } from "../controllers/auth";
import { confirmEmail } from "../controllers/confirmEmail";
import { isAuthenticated } from "../middlewares/auth";

const authRoutes = Router()

authRoutes.post("/signup", signup)

authRoutes.post("/login", login)

authRoutes.post("/logout",isAuthenticated, logout)

authRoutes.get('/confirm-email', confirmEmail);

export default authRoutes