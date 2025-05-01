# 🛍️ TUMO – E-commerce Platform

TUMO est une plateforme e-commerce moderne, rapide et évolutive, construite avec les dernières technologies du web.

## 🧱 Stack utilisée

- **Framework** : [Next.js](https://nextjs.org) (App Router)  
- **Base de données** : PostgreSQL + Prisma ORM  
- **CMS headless** : [Sanity](https://www.sanity.io)  
- **Authentification** : [Lucia Auth](https://lucia-auth.com)  
- **Gestion d'état** : [Zustand](https://github.com/pmndrs/zustand)  
- **Validation de schémas** : [Zod](https://github.com/colinhacks/zod)  
- **UI & Styles** : TailwindCSS + [shadcn/ui](https://ui.shadcn.com)  
- **Paiement** : Stripe  
- **Déploiement** : Vercel  
- **Langage** : TypeScript  

---

## 🚀 Lancer le projet en local

### 1. Lancer le serveur
npm run dev
L'application est accessible à l'adresse http://localhost:3000


## 🛠️ Configuration de Prisma
### 1. Installer Prisma :
npm install prisma @prisma/client
npx prisma init
### 2. Dans schema.prisma, ajouter les modèles User et Session.

### 3. Pousser le schéma dans la base de données :
npx prisma db push

### 4. Ouvrir Prisma Studio pour visualiser les données :
npx prisma studio


## 📦 Configuration Sanity

### 1. Définir les schémas pour les produits, catégories, promotions, etc.

### 2. Lancer le studio Sanity :
sanity deploy

### 3. Extraire le schéma :
sanity schema extract

### 4. Générer les types TypeScript :
sanity typegen generate


## 🔐 Authentification avec Lucia
Lucia est utilisée pour gérer l'authentification sécurisée. Elle fonctionne avec Prisma et stocke les sessions utilisateur.
Assurez-vous de bien configurer vos variables d’environnement .env pour la clé secrète (AUTH_SECRET) et autres paramètres.


## 💳 Paiement avec Stripe
L'intégration Stripe permet d'accepter des paiements en ligne de manière sécurisée.
Configurer vos clés API dans .env :
### STRIPE_SECRET_KEY=...
### STRIPE_PUBLIC_KEY=...


## 📁 Structure du projet
### app/ : routes, pages, composants du routeur App

### components/ : composants UI réutilisables

### lib/ : fonctions utilitaires (auth, Stripe, Sanity, etc.)

### prisma/ : schéma Prisma

### sanity/ : configuration et schéma du CMS

### styles/ : fichiers CSS globaux

### types/ : définitions TypeScript partagées

### .env : variables d’environnement


## ✅ Scripts utiles
### npm run dev             # Lancer le serveur de développement
### npm run build           # Générer le build de production
### npx prisma studio       # Ouvrir l'interface de base de données
### sanity typegen generate # Générer les types Sanity


## ☁️ Déploiement
Le projet est prêt à être déployé sur Vercel.
Assurez-vous d’ajouter toutes les variables d’environnement nécessaires dans le dashboard Vercel.


## ✨ Remerciements
Merci à la communauté open source pour les outils et les bibliothèques incroyables qui rendent ce type de projet possible.
