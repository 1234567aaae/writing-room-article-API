
const Article = require('../models/Article');

exports.createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await Article.create({ title, content, UserId: req.userId });

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.editArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await Article.findByPk(req.params.articleId);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (article.UserId !== req.userId) {
      return res.status(403).json({ error: 'You are not authorized to edit this article' });
    }

    article.title = title;
    article.content = content;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.articleId);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    if (article.UserId !== req.userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this article' });
    }

    await article.destroy();

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({ order: [['createdAt', 'DESC']] });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
exports.getArticleDetail = async (req, res) => {
    try {
      const article = await Article.findByPk(req.params.articleId, {
        include: [{ model: Comment, include: { model: User } }],
      });
  
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }
  
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };
