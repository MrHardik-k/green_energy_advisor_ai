import express from "express";
import { configDotenv } from "dotenv";
import authRouter from "./routes/auth.routes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import energyConsumptionRouter from "./routes/energy_consumption.routes.js";
import co2FootprintRoute from "./routes/co2_footprint.routes.js";
import roiRouter from "./routes/roi.routes.js";

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
app.use("/api/enegy_consumption", energyConsumptionRouter);
app.use("/api/carbon_footprint", co2FootprintRoute);
app.use("/api/roi", roiRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  // connectDB();
  console.log("Server is running on http://localhost:" + PORT);
});

export default app;
