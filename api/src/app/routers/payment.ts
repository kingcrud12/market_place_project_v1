import { Router } from "express";
import bodyParser from "body-parser";
import { isAdmin, isAuthenticated } from "../middlewares/auth";
import { createPaymentSession, handleStripeWebhook, paymentCancel, paymentSuccess } from "../controllers/payment";

const paymentRoutes = Router()

paymentRoutes.post('/create-payment-session',bodyParser.raw({ type: 'application/json' }), createPaymentSession)

//post('/webhook/:id', bodyParser.raw({ type: 'application/json' }), handleStripeWebhook)

paymentRoutes.get('/success', paymentSuccess)
paymentRoutes.post('/cancel', paymentCancel)


export default paymentRoutes