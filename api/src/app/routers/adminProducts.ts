import { Router } from "express"
import { isAdmin } from "../middlewares/auth"
import { createProduct, deleteProduct, updateProduct } from "../controllers/products"


const adminProducts = Router()

adminProducts.post("/product",isAdmin, createProduct)

adminProducts.put("/product/profile/:id",isAdmin, updateProduct)

adminProducts.delete("/product/:id",isAdmin, deleteProduct)





export default adminProducts