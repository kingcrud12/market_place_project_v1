import { Router } from "express";;
import authRoutes from "./auth";
import User from "./user";
import { createPaymentSession } from "../controllers/payment";
import adminRoutes from "./adminRoutes";
import shop from "./Shop";

const rootRouter : Router = Router()

//Auth endpoint
rootRouter.use("/auth", authRoutes)

//User endpoint
rootRouter.use("/user", User)

//Admin endpoint
rootRouter.use("/admin", adminRoutes)

//Shop endpoint
rootRouter.use("/shop", shop)

//Specific payment route
rootRouter.post('/create-payment-session', createPaymentSession)

//Index route
rootRouter.get("/", (req, res)=>{
    return res.status(200).json({message : "Hi buddy, welcome to my marketplace API, get the doc here:"})
})



export default rootRouter