import * as dotenv from "dotenv";

dotenv.config({ path: '.env' });

export const NGROK_URL = process.env.NGROK_URL!;