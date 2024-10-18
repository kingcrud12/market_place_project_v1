import express, { Express } from "express";
import { PORT } from "../secret";
import rootRouter from "../app/routers";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";
import path from 'path';
import paymentRoutes from "../app/routers/payment";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";
import fs from 'fs';
import https from 'https';

const app: Express = express();

// Charger les fichiers de certificat SSL
const privateKey = fs.readFileSync(path.join(__dirname, '../../certs/server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, '../../certs/server.cert'), 'utf8');

const credentials = { key: privateKey, cert: certificate };

// routes de paiement liées au webhook
app.use('/api/market_place/v1/bills', paymentRoutes)

// Middleware pour analyser les requêtes JSON
app.use(express.json());
app.use(cors());

// Utilisation du routeur principal
app.use("/market_place/v1", rootRouter);

// Servir les fichiers statiques (uploads) via HTTPS
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
        url: "https://localhost:3000/market_place/v1",  // HTTPS direct
      },
    ],
  },
  apis: [path.resolve(__dirname, '../app/routers/*.ts')],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/market_place/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Démarrage du serveur HTTPS
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  console.log(`Secure server is running on https://localhost:${PORT}`);
});
