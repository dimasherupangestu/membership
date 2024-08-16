import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken"; // Add this import

export default new (class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const chkUser = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });
    if (!chkUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (chkUser.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: chkUser.id, membership: chkUser.membership },
      process.env.SECRET_KEY
    );

    return res.status(200).json({ user: chkUser, token });
  }

  async register(req, res) {
    const { name, email, password, membership } = req.body;

    if (!name || !email || !password || !membership) {
      return res
        .status(404)
        .json({ message: "Name, email and password are required" });
    }

    const chkUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (chkUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        membership,
      },
    });
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

    return res.status(201).json({ user, token });
  }
})();
