const Article = require('../models/article');

// GET /api/articles
const getAllArticles = (req, res) => {
  try {
    const { categorie, auteur, date } = req.query;
    const articles = Article.findAll({ categorie, auteur, date });
    res.status(200).json({ articles });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// GET /api/articles/search?query=texte
const searchArticles = (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Le paramètre "query" est requis.' });
    }
    const articles = Article.search(query.trim());
    res.status(200).json({ articles });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// GET /api/articles/:id
const getArticleById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID invalide.' });

    const article = Article.findById(id);
    if (!article) return res.status(404).json({ message: `Article #${id} introuvable.` });

    res.status(200).json({ article });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// POST /api/articles
const createArticle = (req, res) => {
  try {
    const { titre, contenu, auteur, date, categorie, tags } = req.body;

    // Validation des champs obligatoires
    if (!titre || titre.trim() === '')
      return res.status(400).json({ message: 'Le titre est obligatoire.' });
    if (!contenu || contenu.trim() === '')
      return res.status(400).json({ message: 'Le contenu est obligatoire.' });
    if (!auteur || auteur.trim() === '')
      return res.status(400).json({ message: "L'auteur est obligatoire." });

    const article = Article.create({ titre, contenu, auteur, date, categorie, tags });
    res.status(201).json({ message: 'Article créé avec succès.', article });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// PUT /api/articles/:id
const updateArticle = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID invalide.' });

    const { titre, contenu, categorie, tags } = req.body;

    const updated = Article.update(id, { titre, contenu, categorie, tags });
    if (!updated) return res.status(404).json({ message: `Article #${id} introuvable.` });

    res.status(200).json({ message: 'Article modifié avec succès.', article: updated });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// DELETE /api/articles/:id
const deleteArticle = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID invalide.' });

    const deleted = Article.delete(id);
    if (!deleted) return res.status(404).json({ message: `Article #${id} introuvable.` });

    res.status(200).json({ message: `Article #${id} supprimé avec succès.` });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

module.exports = {
  getAllArticles,
  searchArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};
