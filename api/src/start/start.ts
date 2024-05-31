import express, { Express } from "express";
import { PORT } from "../secret";
import rootRouter from "../app/routers";
import { PrismaClient } from "@prisma/client"
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from 'path';
import paymentRoutes from "../app/routers/payment";

const app: Express = express();

app.use('/api/market_place/v1/bills', paymentRoutes)

// Middleware pour analyser les demandes JSON
app.use(express.json());

// Utilisation du routeur principal
app.use("/api/market_place/v1", rootRouter);

export const prismaClient = new PrismaClient({
  log: ['query']
})

// Middleware pour servir la documentation Swagger
const swaggerDocument = YAML.load(path.resolve(__dirname, '../swaggerConfig.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
