import express, { Express } from "express";
import { PORT } from "../secret";
import rootRouter from "../app/routers";
import { PrismaClient } from "@prisma/client"
import swaggerUi from "swagger-ui-express";
import path from 'path';
import paymentRoutes from "../app/routers/payment";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";

const app: Express = express();

app.use('/market_place/v1/bills', paymentRoutes)

// Middleware pour analyser les demandes JSON
app.use(express.json());
app.use(cors())

// Utilisation du routeur principal
app.use("/market_place/v1", rootRouter);
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

export const prismaClient = new PrismaClient({
  log: ['query']
})

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
        url: "http://localhost:3000/market_place/v1",
      },
    ],
  },
  apis: [path.resolve(__dirname, '../app/routers/*.ts')], // Chemin mis à jour pour les routeurs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/market_place/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
