// controllers/commentController.js
const Comment = require('../models/Comment');
const Article = require('../models/Article');

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const article = await Article.findByPk(req.params.articleId);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const comment = await Comment.create({ content, UserId: req.userId, ArticleId: article.id });

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.editComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findByPk(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.UserId !== req.userId) {
      return res.status(403).json({ error: 'You are not authorized to edit this comment' });
    }

    comment.content = content;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.UserId !== req.userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this comment' });
    }

    await comment.destroy();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
