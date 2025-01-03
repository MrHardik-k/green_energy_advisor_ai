import express from "express";
import {
  getAppliances,
  getAverageSunnyHours,
  getMonthlyEnergyConsumption,
  getSolarPanelSizeInKw,
} from "../controllers/energy_consumption.controller.js";

const energyConsumptionRouter = express.Router();

energyConsumptionRouter.get("/getAppliances", getAppliances);
energyConsumptionRouter.post(
  "/getMonthlyEnergyConsumption",
  getMonthlyEnergyConsumption
);
energyConsumptionRouter.post("/getSolarPanelSizeInKw", getSolarPanelSizeInKw);
energyConsumptionRouter.post("/getAverageSunnyHours", getAverageSunnyHours);

export default energyConsumptionRouter;
