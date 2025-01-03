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

export const getSolarPanelSizeInKw = (req, res) => {
  // Function to calculate solar panel size
  function calculateSolarPanelSize(
    monthlyEnergyKWh,
    peakSunHours,
    systemEfficiency = 0.8
  ) {
    if (!monthlyEnergyKWh || !peakSunHours) {
      throw new Error("Monthly energy usage and peak sun hours are required.");
    }
    if (monthlyEnergyKWh <= 0 || peakSunHours <= 0) {
      throw new Error(
        "Monthly energy usage and peak sun hours must be positive numbers."
      );
    }
    // Step 1: Calculate daily energy usage
    const dailyEnergyKWh = monthlyEnergyKWh / 30;
    // Step 2: Calculate the required solar panel size in kW
    const requiredPanelSizeKW = dailyEnergyKWh / peakSunHours;
    // Step 3: Adjust for system inefficiency
    const adjustedPanelSizeKW = requiredPanelSizeKW / systemEfficiency;
    return adjustedPanelSizeKW;
  }

  try {
    // Extract data from the request body
    const { peakSunHours, monthlyEnergyKWh } = req.body;

    // Ensure the required data is provided
    if (peakSunHours === undefined || monthlyEnergyKWh === undefined) {
      return res.status(400).json({
        error:
          "Invalid input. Please provide both 'monthlyEnergyKWh' and 'peakSunHours'.",
      });
    }

    // Calculate solar panel size
    const solarPanelSizeInKw = calculateSolarPanelSize(
      parseFloat(monthlyEnergyKWh),
      parseFloat(peakSunHours)
    );

    // Return the result as JSON
    res.json({
      solarPanelSizeInKw: solarPanelSizeInKw.toFixed(2),
      unit: "kW",
    });
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
};

export const getAverageSunnyHours = async (req, res) => {
  function calculateAverageSunlightHours(apiResponse) {
    const solarData = apiResponse.properties.parameter.ALLSKY_SFC_SW_DWN;

    // Get all the values from the response
    const solarValues = Object.values(solarData);

    // Calculate the total sum of all values
    const totalSolarRadiation = solarValues.reduce(
      (sum, value) => sum + value,
      0
    );

    // Calculate the average
    const averageSunlightHours = totalSolarRadiation / solarValues.length;

    return averageSunlightHours;
  }
  const { lat, lon } = req.body;
  const api_path =
    "https://power.larc.nasa.gov/api/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&latitude=" +
    lat +
    "&longitude=" +
    lon +
    "&start=20230101&end=20231231&format=JSON";

  const response = await fetch(api_path);
  const data = await response.json();
  const averageSunlightHours = calculateAverageSunlightHours(data);
  res.json({ averageSunlightHours: averageSunlightHours.toFixed(2) });
};
