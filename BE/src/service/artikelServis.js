import prisma from "../config/prisma.js";

export default new (class ArtikelServis {
  async getAll() {
    const articles = await prisma.article.findMany();
    return articles;
  }

  async createArticle(data) {
    const artikel = await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
      },
    });

    return artikel;
  }

  async getArticleById(id) {
    const article = await prisma.article.findUnique({
      where: {
        id: Number(id),
      },
    });
    return article;
  }

  async deleteArticle(id) {
    const article = await prisma.article.delete({
      where: {
        id: Number(id),
      },
    });

    return article;
  }
})();
