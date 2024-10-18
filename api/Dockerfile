# Étape 1: Utiliser une image Node.js pour la build
FROM node:20 AS build

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code source dans le conteneur
COPY . .

# Étape 2: Créer une image finale minimale
FROM node:20-slim

# Définir le répertoire de travail pour l'image finale
WORKDIR /app

# Copier le package.json et le package-lock.json de l'étape de build
COPY --from=build /app/package.json /app/
COPY --from=build /app/package-lock.json /app/

# Copier le code source et les modules node depuis l'étape de build
COPY --from=build /app/src /app/src
COPY --from=build /app/node_modules /app/node_modules

# Installer OpenSSL
RUN apt-get update -y && apt-get install -y openssl

# Exposer le port de l'API
EXPOSE 3000

# Commande de démarrage de l'application
CMD ["npx", "ts-node", "src/start/start.ts", "prisma migrate deploy"]
