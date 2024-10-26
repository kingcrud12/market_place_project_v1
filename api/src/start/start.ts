import express, { Express } from "express";
import { PORT } from "../secret";
import rootRouter from "../app/routers";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";
import path from 'path';
import paymentRoutes from "../app/routers/payment";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";

const app: Express = express();

// routes de paiement liées au webhook
app.use('/api/market_place/v1/bills', paymentRoutes);

// Middleware pour analyser les requêtes JSON
app.use(express.json());
app.use(cors());

// Utilisation du routeur principal
app.use("/market_place/v1", rootRouter);

// Servir les fichiers statiques (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Prisma Client
export const prismaClient = new PrismaClient({
  log: ['query']
});

// Configuration de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Marketplace",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "https://fruits-eshop-api-de2dff9b40e9.herokuapp.com/market_place/v1",  // URL publique Heroku
      },
    ],
  },
  apis: [path.resolve(__dirname, '../app/routers/*.ts')],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/market_place/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Démarrage du serveur HTTP
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
