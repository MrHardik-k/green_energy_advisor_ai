import express from "express";
import { configDotenv } from "dotenv";
import authRouter from "./routes/auth.routes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

configDotenv();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: "*", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + PORT);
});

export default app;
