import * as dotenv from "dotenv";

dotenv.config({ path: '.env' });

export const PORT = process.env.PORT;

export const JWT_SECRET = process.env.JWT_SECRET!;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
export const EndpointSecret = process.env.endpointSecret!;
export const user_mail = process.env.user_mail!;
export const mdp_mail = process.env.mdp_mail!;
export const reset_token_secret = process.env.resetTokenSecret!;
export const BACKEND_URL = process.env.BACKEND_URL!;

export const RUN_MIGRATIONS = process.env.RUN_MIGRATIONS  === 'true';

// Chemins vers les fichiers SSL
export const SSL_KEY_PATH = process.env.SSL_KEY_PATH!;
export const SSL_CERT_PATH = process.env.SSL_CERT_PATH!;

export const NGROK_URL = process.env.NGROK_URL!;
