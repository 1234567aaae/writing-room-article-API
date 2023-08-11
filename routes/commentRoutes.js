// routes/commentRoutes.js
const express = require('express');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add/:articleId', authMiddleware, commentController.addComment);
router.put('/edit/:commentId', authMiddleware, commentController.editComment);
router.delete('/delete/:commentId', authMiddleware, commentController.deleteComment);

module.exports = router;
