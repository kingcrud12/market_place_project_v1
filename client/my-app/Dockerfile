# Utilisez l'image officielle de Node.js
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install --legacy-peer-deps

# Copiez le reste des fichiers de l'application
COPY . .

# Construire l'application pour la production (cela compilera le TypeScript)
RUN npm run build

# Exposez le port sur lequel l'application va tourner
EXPOSE 3002

# Commande pour démarrer l'application
CMD ["npm", "start"]
