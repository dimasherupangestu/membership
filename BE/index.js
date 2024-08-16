import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/router.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*", // Ganti dengan URL frontend
    credentials: true,
  })
);

app.use(express.json());

// API routes
app.use("/api", router);

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
