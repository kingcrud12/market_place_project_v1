# Généralités
Ce projet regroupe l'API et le client front d'une marketplace.

# Installation
## Outils
Installer npm
Installer node
Installer ngrok
## Build de l'API
### Installation ou mise à jour des packages
Dans le dossier market_place_project_v1
Vous placez vous dans le dossier api puis installer les dépendences nécessaires à l'API 
<code>
cd api; npm install
</code>

### Creer le fichier .env
 - créer un fichier .env à la racine du dossier API
 - Dans le fichier .env, créer les variables suivantes:
   PORT = 3000
   JWT_SECRET = pour définir une clé JWT
- En utilisant votre serveur definissez le user_mail et le mdp_mail
   user_mail = pour définir un serveur SMTP

   mdp_mail = pour définir la clé d'accès à votre serveur smtp
### Ajouter la base de données à Prisma
- Installer mysql-server
Si vous êtes sur Ubuntu/Linux
<code> sudo apt install mysql-server</code>

- Creer une base de données et un utilisateur
<code>sudo mysql -u root -p </code>

CODE SQL
<code>
CREATE DATABASE mon_projet;
CREATE USER 'mon_utilisateur'@'localhost' IDENTIFIED BY 'mon_mot_de_passe';
GRANT ALL PRIVILEGES ON mon_projet.* TO 'mon_utilisateur'@'localhost';
FLUSH PRIVILEGES;
EXIT;
</code>

- Configurer Prisma pour se connecter à la base de données MySQL
Metter à jour le fichier ".env"
DATABASE_URL="mysql://mon_utilisateur:mon_mot_de_passe@localhost:3306/mon_projet"
- Verifier que le prisma/schema.prisma est configuré pour utiliser MySQL
<code>
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
</code>

- Appliquer les migrations existantes
<code>
npx prisma migrate deploy
</code>

- Générer le Client Prisma
<code>npx prisma generate</code>

### Creer un compte Stripe
Pour utiliser les controleurs de paiement ainsi que les routes associées : 
Vous pouvez utliser les variables suivantes : 
- Creer un compte Stripe
- Ajouter votre end point privé endpointSecret (clé stripe lue par le webhook)
endpointSecret = 'some endpoint secret' 
- Ajouter votre clé privé STRIPE_SECRET_KEY
STRIPE_SECRET_KEY = some stripe key 

## Lancer l'API
A partir du dossier api, lancer la commande <code>npm start</code>
Le serveur se lance sur le PORT défini dans le .env

## Construire le client
BACKEND_URL = http://localhost:3000/api/market_place/v1/bills/ (url utile pour la session de paiement)

# Utilisation de l'API

## Liste des routes
1. [Routes d'authentification](#routes-dauthentification)
2. [Routes administratives (Admin)](#routes-administratives-admin)
    - [Gestion des utilisateurs](#gestion-des-utilisateurs)
    - [Gestion des produits](#gestion-des-produits)
    - [Gestion des commandes](#gestion-des-commandes)
3. [Routes utilisateur](#routes-utilisateur)
4. [Routes de la boutique (Shop)](#routes-de-la-boutique-shop)
    - [Gestion des produits](#gestion-des-produits-shop)
    - [Gestion des commandes](#gestion-des-commandes-shop)
    - [Gestion des paniers](#gestion-des-paniers)
5. [Routes de paiement](#routes-de-paiement)
6. [Route principale (RootRouter)](#route-principale-rootrouter)
7. [Middlewares](#middlewares)

---

## Routes d'authentification

### **POST** `/auth/signup`
- **Description** : Crée un nouvel utilisateur.
- **Corps de la requête** :
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Réponse** : Confirmation de la création de l'utilisateur.

### **POST** `/auth/login`
- **Description** : Connecte un utilisateur existant.
- **Corps de la requête** :
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Réponse** : Jeton d'authentification.

### **POST** `/auth/logout`
- **Description** : Déconnecte l'utilisateur.

### **GET** `/auth/confirm-email`
- **Description** : Confirme l'adresse e-mail de l'utilisateur via un token envoyé par e-mail.
- **Query Parameters** :
  - `token` : Token de confirmation.

## Routes administratives (Admin)

### Gestion des utilisateurs

#### **GET** `/admin/users`
- **Description** : Récupère la liste de tous les utilisateurs.
- **Middleware** : `isAdmin`
- **Réponse** : Liste des utilisateurs.

#### **DELETE** `/admin/user/:id`
- **Description** : Supprime un utilisateur spécifique.
- **Params** :
  - `id` : ID de l'utilisateur à supprimer.
- **Middleware** : `isAdmin`
- **Réponse** : Confirmation de la suppression de l'utilisateur.

### Gestion des produits

#### **POST** `/admin/product`
- **Description** : Crée un nouveau produit.
- **Corps de la requête** :
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "stock": "number"
  }
  ```
- **Middleware** : `isAdmin`
- **Réponse** : Détails du produit créé.

#### **PUT** `/admin/product/{id}`
- **Description** : Met à jour un produit spécifique.
- **Params** :
  - `id` : ID du produit à mettre à jour.
- **Middleware** : `isAdmin`
- **Réponse** : Détails du produit mis à jour.

#### **DELETE** `/admin/product/{id}`
- **Description** : Supprime un produit spécifique.
- **Params** :
  - `id` : ID du produit à supprimer.
- **Middleware** : `isAdmin`
- **Réponse** : Confirmation de la suppression du produit.

#### **GET** `/admin/products`
- **Description** : Récupère tous les produits.
- **Params** :
- **Middleware** : `isAdmin`
- **Réponse** : Confirmation de la récupération des produits.

### Gestion des commandes

#### **GET** `/admin/orders`
- **Description** : Récupère la liste de toutes les commandes.
- **Middleware** : `isAdmin`
- **Réponse** : Liste des commandes.

#### **GET** `/admin/order/{id}`
- **Description** : Récupère les détails d'une commande spécifique.
- **Params** :
  - `id` : ID de la commande.
- **Middleware** : `isAdmin`
- **Réponse** : Détails de la commande.

#### **DELETE** `/admin/order/{id}`
- **Description** : Supprime une commande spécifique.
- **Params** :
  - `id` : ID de la commande.
- **Middleware** : `isAdmin`
- **Réponse** : Confirmation de la suppression de la commande.

## Routes utilisateur

### **GET** `/user/`
- **Description** : Récupère les informations du profil de l'utilisateur connecté.
- **Middleware** : `isAuthenticated`
- **Réponse** : Détails de l'utilisateur.

### **PUT** `/user/profile/:id`
- **Description** : Met à jour les informations du profil d'un utilisateur spécifique.
- **Params** :
  - `id` : ID de l'utilisateur.
- **Middleware** : `isAuthenticated`
- **Réponse** : Détails de l'utilisateur mis à jour.

## Routes de la boutique (Shop)

### Gestion des produits (Shop)

#### **GET** `/shop/products`
- **Description** : Récupère la liste de tous les produits disponibles.
- **Réponse** : Liste des produits.

#### **GET** `/shop/product/:id`
- **Description** : Récupère les détails d'un produit spécifique.
- **Params** :
  - `id` : ID du produit.
- **Réponse** : Détails du produit.

### Gestion des commandes (Shop)

#### **POST** `/shop/user/order`
- **Description** : Crée une nouvelle commande pour l'utilisateur connecté.
- **Middleware** : `isAuthenticated`
- **Corps de la requête** : Détails des produits commandés.
- **Réponse** : Détails de la commande créée.

#### **GET** `/shop/user/Orders`
- **Description** : Récupère la liste des commandes de l'utilisateur connecté.
- **Middleware** : `isAuthenticated`
- **Réponse** : Liste des commandes.

#### **GET** `/shop/user/OrderDetails/:id`
- **Description** : Récupère les détails d'une commande spécifique de l'utilisateur connecté.
- **Params** :
  - `id` : ID de la commande.
- **Middleware** : `isAuthenticated`
- **Réponse** : Détails de la commande.

#### **DELETE** `/shop/user/Order/:id`
- **Description** : Supprime une commande spécifique de l'utilisateur connecté.
- **Params** :
  - `id` : ID de la commande.
- **Middleware** : `isAuthenticated`
- **Réponse** : Confirmation de la suppression de la commande.

### Gestion des paniers

#### **POST** `/shop/cart`
- **Description** : Ajoute un produit au panier de l'utilisateur connecté.
- **Middleware** : `isAuthenticated`
- **Corps de la requête** : Détails du produit à ajouter.
- **Réponse** : Détails du panier mis à jour.

#### **POST** `/shop/cart/:cartId/:id`
- **Description** : Ajoute un produit spécifique au panier via son ID.
- **Params** :
  - `cartId` : ID du panier.
  - `id` : ID du produit.
- **Middleware** : `isAuthenticated`
- **Réponse** : Détails du panier mis à jour.

#### **DELETE** `/shop/cart/Item/:cartId/:productIds`
- **Description** : Supprime des produits spécifiques du panier.
- **Params** :
  - `cartId` : ID du panier.
  - `productIds` : IDs des produits à supprimer.
- **Middleware** : `isAuthenticated`
- **Réponse** : Confirmation de la suppression des produits.

#### **GET** `/shop/Cart/:cartId/:id`
- **Description** : Récupère les détails d'un panier spécifique.
- **Params** :
  - `cartId` : ID du panier.
  - `id` : ID de l'utilisateur.
- **Middleware** : `isAuthenticated`
- **Réponse** : Détails du panier.

## Routes de paiement

### **POST** `/create-payment-session`
- **Description** : Crée une session de paiement pour l'utilisateur connecté.
- **Corps de la requête** : Détails de la commande pour laquelle la session est créée.
- **Réponse** : Détails de la session de paiement.

### **POST** `/bills/payment/webhook`
- **Description** : Gère les webhooks Stripe pour les paiements.
- **Corps de la requête** : Webhook Stripe.
- **Réponse** : Confirmation de la réception du webhook.

### **GET** `/bills/payment/success`
- **Description** : Affiche la page de succès après un paiement réussi.
- **Réponse** : Message de succès.

### **POST** `/bills/payment/cancel`
- **Description** : Annule une session de paiement.
- **Réponse** : Confirmation de l'annulation.

## Route principale (RootRouter)

### **GET** `/`
- **Description** : Point d'entrée principal de l'API. Affiche un message de bienvenue et un lien vers la documentation (à configurer).

## Middlewares

### `isAuthenticated`
- **Description** : Vérifie si l'utilisateur est connecté avant d'autoriser l'accès à certaines routes.

### `isAdmin`
- **Description** : Vérifie si l'utilisateur est un administrateur avant d'autoriser l'accès à certaines routes.


## Branch Naming Convention

### Branch Types

Les types de branches doivent être parmi les suivants :

- **feature**: Branches pour le développement de nouvelles fonctionnalités.
- **bugfix**: Branches pour les corrections de bugs.
- **hotfix**: Branches pour les corrections urgentes en production.
- **release**: Branches pour préparer une nouvelle version.
- **chore**: Branches pour des tâches de maintenance ou des mises à jour de configuration.
- **docs**: Branches pour la mise à jour de la documentation.
- **experiment**: Branches pour des expériences ou des prototypes.

### Branch Naming Examples

- **Développement d'une nouvelle fonctionnalité**: `feature/auth-login-page`
- **Correction d'un bug**: `bugfix/user-profile-update`
- **Correction urgente en production**: `hotfix/payment-gateway-error`
- **Préparation d'une nouvelle version**: `release/v1.2.0`
- **Tâche de maintenance ou de configuration**: `chore/update-dependencies`
- **Mise à jour de la documentation**: `docs/add-installation-guide`
- **Expérience ou prototype**: `experiment/new-ui-design`

## Commit Convention

### Commit Types

Les types de commit doivent être parmi les suivants :

- **feat**: Ajout d'une nouvelle fonctionnalité.
- **fix**: Correction d'un bug.
- **docs**: Modifications de documentation.
- **style**: Changements de formatage de code (espacement, formatage, points-virgules manquants, etc.).
- **refactor**: Refactoring de code sans ajout de nouvelles fonctionnalités ou corrections de bugs.
- **perf**: Améliorations des performances.
- **test**: Ajout ou modification de tests.
- **chore**: Changements de configuration, outils de construction ou tâches de maintenance.
- **revert**: Annulation d'un commit précédent.

### Subject and Description

Le sujet doit être une phrase concise et descriptive expliquant ce que fait le commit. Il doit être écrit en minuscules et sans point à la fin.

#### Exemples

- **Ajout d'une nouvelle fonctionnalité**:
  - `feat(auth): add login functionality`
  - Ajout d'une nouvelle page de connexion avec validation des champs.

- **Correction d'un bug**:
  - `fix(user): fix profile update bug`
  - Le bug empêchait la mise à jour des informations de l'utilisateur.

- **Mise à jour de la documentation**:
  - `docs(readme): update project documentation`
  - Ajout d'une section sur l'installation et la configuration.

- **Refactoring du code**:
  - `refactor(dashboard): refactor dashboard component`
  - Simplification du code et amélioration de la lisibilité.

## Contributions

Les contributions ont été apportées par :

- Yann DIPITA