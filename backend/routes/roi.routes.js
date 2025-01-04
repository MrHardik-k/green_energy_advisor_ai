import express from "express";
import { getRoi } from "../controllers/roi.controller.js";

const roiRouter = express.Router();

roiRouter.post("/getRoi", getRoi);

export default roiRouter;
