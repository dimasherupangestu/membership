import userServis from "../service/userServis.js";

export default new (class UserController {
  async getAllUser(req, res) {
    try {
      const response = await userServis.getUsers();
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getUserByAricle(req, res) {
    try {
      const userId = req.user.id;
      const response = await userServis.GetUserByArticle(userId);
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
  async getUserByMovie(req, res) {
    try {
      const userId = req.user.id;
      const response = await userServis.GetUserByVideo(userId);
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
})();
