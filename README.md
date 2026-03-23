# 📝 Blog API – INF222 TAF1

API REST backend pour la gestion d'articles de blog, développée avec **Node.js (Express)** et **SQLite**.

---

## 🛠️ Technologies utilisées

| Outil | Rôle |
|---|---|
| Node.js + Express | Serveur HTTP |
| better-sqlite3 | Base de données SQLite |
| swagger-ui-express | Documentation interactive |
| cors | Gestion des origines croisées |

---

## 📁 Structure du projet

```
blog-api/
├── data/
│   └── blog.db              # Base de données SQLite (auto-créée)
├── src/
│   ├── app.js               # Point d'entrée
│   ├── config/
│   │   ├── database.js      # Connexion SQLite
│   │   └── swagger.yaml     # Documentation OpenAPI
│   ├── models/
│   │   └── article.js       # Modèle Article (CRUD)
│   ├── controllers/
│   │   └── articleController.js
│   └── routes/
│       └── articles.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/VOTRE_USERNAME/blog-api.git
cd blog-api

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur
npm start

# (développement avec rechargement automatique)
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

---

## 📡 Endpoints de l'API

### Créer un article
```http
POST /api/articles
Content-Type: application/json

{
  "titre": "Introduction à Node.js",
  "contenu": "Node.js est un environnement d'exécution JavaScript...",
  "auteur": "Charles",
  "date": "2026-03-23",
  "categorie": "Technologie",
  "tags": ["nodejs", "backend", "javascript"]
}
```
**Réponse 201 :**
```json
{
  "message": "Article créé avec succès.",
  "article": { "id": 1, "titre": "Introduction à Node.js", ... }
}
```

---

### Lire tous les articles
```http
GET /api/articles
GET /api/articles?categorie=Technologie
GET /api/articles?auteur=Charles
GET /api/articles?date=2026-03-23
GET /api/articles?categorie=Tech&date=2026-03-23
```
**Réponse 200 :**
```json
{
  "articles": [
    { "id": 1, "titre": "Introduction à Node.js", "auteur": "Charles", ... }
  ]
}
```

---

### Lire un article par ID
```http
GET /api/articles/1
```
**Réponse 200 :**
```json
{ "article": { "id": 1, "titre": "Introduction à Node.js", ... } }
```
**Réponse 404 :**
```json
{ "message": "Article #1 introuvable." }
```

---

### Modifier un article
```http
PUT /api/articles/1
Content-Type: application/json

{
  "titre": "Node.js – Guide complet",
  "categorie": "Développement",
  "tags": ["nodejs", "express", "api"]
}
```
**Réponse 200 :**
```json
{ "message": "Article modifié avec succès.", "article": { ... } }
```

---

### Supprimer un article
```http
DELETE /api/articles/1
```
**Réponse 200 :**
```json
{ "message": "Article #1 supprimé avec succès." }
```

---

### Rechercher des articles
```http
GET /api/articles/search?query=nodejs
```
**Réponse 200 :**
```json
{ "articles": [ { "id": 1, "titre": "Introduction à Node.js", ... } ] }
```

---

## 📊 Codes HTTP utilisés

| Code | Signification |
|---|---|
| 200 | OK – Requête réussie |
| 201 | Created – Article créé |
| 400 | Bad Request – Données manquantes/invalides |
| 404 | Not Found – Article introuvable |
| 500 | Internal Server Error – Erreur serveur |

---

## 📄 Documentation Swagger

Accessible après démarrage sur :
```
http://localhost:3000/api-docs
```

---

## 🚀 Déploiement (optionnel)

Déploiement possible sur **Railway** ou **Render** :
1. Créer un compte sur [render.com](https://render.com)
2. Connecter le dépôt GitHub
3. Choisir "Web Service" → Node.js
4. Commande de démarrage : `npm start`
