import express from "express";
import { carbon_footprint_estimation } from "../controllers/co2_footprint.controller.js";

const co2FootprintRoute = express.Router();

co2FootprintRoute.post("/estimation", carbon_footprint_estimation);

export default co2FootprintRoute;
