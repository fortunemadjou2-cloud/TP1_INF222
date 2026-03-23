const db = require('../config/database');

const Article = {

  // Récupérer tous les articles (avec filtres optionnels)
  findAll({ categorie, auteur, date } = {}) {
    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];

    if (categorie) {
      query += ' AND LOWER(categorie) = LOWER(?)';
      params.push(categorie);
    }
    if (auteur) {
      query += ' AND LOWER(auteur) = LOWER(?)';
      params.push(auteur);
    }
    if (date) {
      query += ' AND date = ?';
      params.push(date);
    }

    query += ' ORDER BY id DESC';
    const rows = db.prepare(query).all(...params);
    return rows.map(parseTags);
  },

  // Récupérer un article par ID
  findById(id) {
    const row = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
    return row ? parseTags(row) : null;
  },

  // Rechercher des articles (titre ou contenu)
  search(query) {
    const like = `%${query}%`;
    const rows = db.prepare(
      'SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ? ORDER BY id DESC'
    ).all(like, like);
    return rows.map(parseTags);
  },

  // Créer un article
  create({ titre, contenu, auteur, date, categorie, tags }) {
    const tagsJson = JSON.stringify(Array.isArray(tags) ? tags : []);
    const dateVal = date || new Date().toISOString().split('T')[0];
    const stmt = db.prepare(
      'INSERT INTO articles (titre, contenu, auteur, date, categorie, tags) VALUES (?, ?, ?, ?, ?, ?)'
    );
    const result = stmt.run(titre, contenu, auteur, dateVal, categorie || 'Général', tagsJson);
    return Article.findById(result.lastInsertRowid);
  },

  // Modifier un article
  update(id, { titre, contenu, categorie, tags }) {
    const article = Article.findById(id);
    if (!article) return null;

    const newTitre    = titre     ?? article.titre;
    const newContenu  = contenu   ?? article.contenu;
    const newCateg    = categorie ?? article.categorie;
    const newTags     = tags !== undefined ? JSON.stringify(Array.isArray(tags) ? tags : []) : JSON.stringify(article.tags);

    db.prepare(
      'UPDATE articles SET titre = ?, contenu = ?, categorie = ?, tags = ? WHERE id = ?'
    ).run(newTitre, newContenu, newCateg, newTags, id);

    return Article.findById(id);
  },

  // Supprimer un article
  delete(id) {
    const result = db.prepare('DELETE FROM articles WHERE id = ?').run(id);
    return result.changes > 0;
  }
};

// Helper : parse le champ tags (stocké en JSON string)
function parseTags(row) {
  try {
    row.tags = JSON.parse(row.tags);
  } catch {
    row.tags = [];
  }
  return row;
}

module.exports = Article;
