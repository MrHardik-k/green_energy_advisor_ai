import express from "express";
import {
  getAppliances,
  getMonthlyEnergyConsumption,
} from "../controllers/energy_consumption.controller.js";

const energyConsumptionRouter = express.Router();

energyConsumptionRouter.get("/getAppliances", getAppliances);
energyConsumptionRouter.post(
  "/getMonthlyEnergyConsumption",
  getMonthlyEnergyConsumption
);

export default energyConsumptionRouter;
