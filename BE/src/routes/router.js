import { Router } from "express";
import authController from "../controller/authController.js";
import memberContoller from "../controller/memberContoller.js";
import artikelController from "../controller/artikelController.js";
import movieController from "../controller/movieController.js";
import authMiddleware from "../middlewares/auth.js";
import userController from "../controller/userController.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// auth
router.post("/register", authController.register);
router.post("/login", authController.login);
// router.post("/auth/google-login", authController.googleLogin);

// member
router.post("/member", memberContoller.createMember);
router.get("/member", memberContoller.getMembers);
router.patch(
  "/memberArticle",
  authMiddleware.authorization,
  memberContoller.updateMemberArticle
);

router.patch(
  "/memberVidio",
  authMiddleware.authorization,
  memberContoller.updateMemberVideo
);

// artikel
router.post("/article", artikelController.createArtikel);
router.get("/articles", artikelController.getAllArtikel);
router.get("/article/:id", artikelController.getArtikelById);
router.delete("/article/:id", artikelController.deleteArtikel);

// movie
router.get("/movies", movieController.getAllMovies);
router.get("/movie/:id", movieController.getMovieById);
router.post("/movie", movieController.createMovie);
router.delete("/movie/:id", movieController.deleteMovie);

// user
router.get("/users", userController.getAllUser);
router.get(
  "/userArticle",
  authMiddleware.authorization,
  userController.getUserByAricle
);

router.get(
  "/userVidio",
  authMiddleware.authorization,
  userController.getUserByMovie
);

export default router;
