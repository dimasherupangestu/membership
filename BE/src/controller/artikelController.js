import artikelServis from "../service/artikelServis.js";

export default new (class ArtikelController {
  async getAllArtikel(req, res) {
    try {
      const response = await artikelServis.getAll();

      res.status(200).json({ data: response });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async createArtikel(req, res) {
    try {
      const { title, content } = req.body;
      //   console.log("Received data:", title, content);

      const response = await artikelServis.createArticle({
        title,
        content,
      });

      res.status(200).json({ response });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getArtikelById(req, res) {
    try {
      const { id } = req.params;
      const response = await artikelServis.getArticleById(id);
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
  async deleteArtikel(req, res) {
    try {
      const { id } = req.params;
      const response = await artikelServis.deleteArticle(id);
      res.status(200).json({ response });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
})();
