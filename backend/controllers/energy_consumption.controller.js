import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAppliances = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "/../data/power_consumption.json");

    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data); // Parse the JSON content
    jsonData["appliances"].forEach((ele) => {
      ele["noOfAppliances"] = 0;
    });
    // noOfAppliances
    res.json(jsonData);
  } catch (err) {
    console.error("Error reading or parsing the file:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMonthlyEnergyConsumption = (req, res) => {
  function calculateMonthlyEnergyConsumption(appliances) {
    let totalMonthlyEnergyConsumption = 0;

    appliances.forEach((appliance) => {
      // Daily energy consumption in KWh
      const dailyEnergyConsumption =
        (appliance.noOfAppliances * appliance.wattage * appliance.hoursPerDay) /
        1000;
      // Monthly energy consumption
      const monthlyEnergyConsumption = dailyEnergyConsumption * 30;
      totalMonthlyEnergyConsumption += monthlyEnergyConsumption;
    });

    return totalMonthlyEnergyConsumption; // Total in KWh
  }

  try {
    const { appliances } = req.body;

    // Validate input
    if (!Array.isArray(appliances) || appliances.length === 0) {
      return res.status(400).json({
        error: "Invalid or missing 'appliances' array in request body.",
      });
    }

    // Perform calculation
    const totalMonthlyEnergyConsumption =
      calculateMonthlyEnergyConsumption(appliances);

    // Return result
    res.json({
      totalMonthlyEnergyConsumption: totalMonthlyEnergyConsumption.toFixed(2), // Rounded to 2 decimal places
      unit: "KWh",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};
