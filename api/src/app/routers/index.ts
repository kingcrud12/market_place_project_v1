import { Router } from "express";;
import authRoutes from "./auth";
import paymentRoutes from "./payment";
import adminRoutesUser from "./admin";
import Shop from "./Shop_user";
import User from "./user";
import { createPaymentSession } from "../controllers/payment";
import admin from "./admin";
import Shop_user from "./Shop_user";
import uploadRouter from "./upload";

const rootRouter : Router = Router()

//routes for users : singup, login, logout
rootRouter.use("/auth", authRoutes)

//routes for admin : managing users, products and orders
rootRouter.use("/admin", admin)

//routes for user : manage theirs accounts
rootRouter.use("/user", User)

//routes for user : create and manage theirs user's carts and orders
rootRouter.use("/shop", Shop_user)

//routes for : getting all products, a single product
rootRouter.use("/shop", Shop)


//rootRouter.use("/shop/payment", paymentRoutes)

rootRouter.use('/upload', uploadRouter);


rootRouter.post('/create-payment-session', createPaymentSession)

rootRouter.get("/", (req, res)=>{
    const documentationUrl = "http://localhost:3000/market_place/v1/api-docs";
    return res.status(200).json({message : "Hi buddy, welcome to my marketplace API, get the doc here:", documentationUrl})
})



export default rootRouter