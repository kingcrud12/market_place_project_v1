#!/bin/sh

# Si la variable d'environnement RUN_MIGRATIONS est définie à true et si le fichier .migrations_applied n'existe pas
if [ "$RUN_MIGRATIONS" = "true" ] && [ ! -f "/app/.migrations_applied" ]; then
    echo "Applying Prisma migrations..."
    npx prisma migrate deploy
    # Créer un fichier pour indiquer que les migrations ont été appliquées
    touch /app/.migrations_applied
else
    echo "Skipping Prisma migrations..."
fi

# Démarrer l'application
echo "Starting the app..."
node build/start/start.js
