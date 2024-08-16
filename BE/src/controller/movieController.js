import movieServis from "../service/movieServis.js";

export default new (class MovieController {
  async getAllMovies(req, res) {
    try {
      const response = await movieServis.getMovies();
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
  async getMovieById(req, res) {
    try {
      const { id } = req.params;
      const response = await movieServis.getMovieById(id);
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async createMovie(req, res) {
    try {
      const { title, content, url, imageString } = req.body;
      const response = await movieServis.cretaeMovie({
        title,
        content,
        url,
        imageString,
      });
      res.status(200).json({ response });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async deleteMovie(req, res) {
    try {
      const { id } = req.params;
      const response = await movieServis.deleteMovie(id);
      res.status(200).json({ response });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
})();
