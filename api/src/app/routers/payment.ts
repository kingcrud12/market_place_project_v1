import express, { Router, Request, Response } from 'express';
import bodyParser from "body-parser";
import { isAdmin, isAuthenticated } from "../middlewares/auth";
import { createPaymentSession, handleStripeWebhook, paymentCancel, paymentSuccess } from "../controllers/payment";

const paymentRoutes : Router = express.Router()


paymentRoutes.post('/webhook',express.raw({ type: 'application/json' }), handleStripeWebhook)

paymentRoutes.get('/success', paymentSuccess)
paymentRoutes.post('/cancel', paymentCancel)


export default paymentRoutes