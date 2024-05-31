import { Router } from "express";
import { getUser, updateUserInfo } from "../controllers/auth";
import { isAuthenticated } from "../middlewares/auth";

const User = Router()

//user routes
User.get("/",isAuthenticated, getUser)
User.put("/profile/:id",isAuthenticated, updateUserInfo)

export default User 