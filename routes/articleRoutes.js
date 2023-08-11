// routes/articleRoutes.js
const express = require('express');
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, articleController.createArticle);
router.put('/edit/:articleId', authMiddleware, articleController.editArticle);
router.delete('/delete/:articleId', authMiddleware, articleController.deleteArticle);
router.get('/all', articleController.getAllArticles);
router.get('/detail/:articleId', articleController.getArticleDetail);

module.exports = router;
