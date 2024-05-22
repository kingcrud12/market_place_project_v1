import { Router } from "express";
import { deleteUser,getUsers} from "../controllers/auth";
import { isAdmin } from "../middlewares/auth";

const adminRoutesUser = Router()

adminRoutesUser.delete("/user/:id", isAdmin, deleteUser)
adminRoutesUser.get("/users", isAdmin, getUsers)


export default adminRoutesUser