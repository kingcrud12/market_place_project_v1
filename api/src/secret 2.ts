import dotenv from "dotenv"

dotenv.config({path:'.env'})

export const PORT = process.env.PORT

export const JWT_SECRET = process.env.JWT_SECRET!

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!

export const EndpointSecret  = process.env.endpointSecret!

export const user_mail  = process.env.user_mail!

export const mdp_mail  = process.env.mdp_mail!

export const reset_token_secret = process.env.resetTokenSecret!