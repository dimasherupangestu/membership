import jwt from "jsonwebtoken";

export default new (class AuthMiddleware {
  authorization(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Please login first!" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const verified = jwt.verify(token, process.env.SECRET_KEY);
      req.user = verified;
      console.log("User:", req.user);
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
})();
