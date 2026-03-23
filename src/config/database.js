const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../data/blog.db');

// Connexion à la base de données
const db = new Database(DB_PATH);

// Activation des clés étrangères
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Création de la table articles si elle n'existe pas
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    titre     TEXT    NOT NULL,
    contenu   TEXT    NOT NULL,
    auteur    TEXT    NOT NULL,
    date      TEXT    NOT NULL DEFAULT (date('now')),
    categorie TEXT    NOT NULL DEFAULT 'Général',
    tags      TEXT    NOT NULL DEFAULT '[]'
  )
`);

console.log('✅ Base de données SQLite connectée et initialisée.');

module.exports = db;
