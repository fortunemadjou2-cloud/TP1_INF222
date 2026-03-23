const express = require('express');
const router  = express.Router();
const {
  getAllArticles,
  searchArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');

// IMPORTANT : /search doit être déclaré AVANT /:id
router.get('/search',  searchArticles);   // GET  /api/articles/search?query=texte
router.get('/',        getAllArticles);    // GET  /api/articles
router.get('/:id',     getArticleById);   // GET  /api/articles/:id
router.post('/',       createArticle);    // POST /api/articles
router.put('/:id',     updateArticle);    // PUT  /api/articles/:id
router.delete('/:id',  deleteArticle);    // DELETE /api/articles/:id

module.exports = router;
