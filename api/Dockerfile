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

# Compiler le TypeScript en JavaScript
RUN npx tsc

# Créer le répertoire pour les uploads
RUN mkdir -p /app/uploads

# Étape 2: Créer une image finale minimale
FROM node:20-slim

# Définir le répertoire de travail pour l'image finale
WORKDIR /app

# Copier le package.json et le package-lock.json de l'étape de build
COPY --from=build /app/package.json /app/
COPY --from=build /app/package-lock.json /app/

# Copier le code source et les modules node depuis l'étape de build
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/uploads /app/uploads
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/certs /app/certs
COPY --from=build /app/start.sh /app/start.sh

# Installer OpenSSL
RUN apt-get update -y && apt-get install -y openssl

# Rendre le script de démarrage exécutable
RUN chmod +x /app/start.sh

# Exposer le port de l'API
EXPOSE $PORT

# Commande de démarrage de l'application
CMD ["/app/start.sh"]
