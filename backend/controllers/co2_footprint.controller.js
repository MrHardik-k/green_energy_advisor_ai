import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const carbon_footprint_estimation = async (req, res) => {
  // Destructure input values from request body
  const { electricityConsumption, userState } = req.body;

  // Validate input
  if (!electricityConsumption || !userState) {
    return res.status(400).json({
      error: "Both electricityConsumption and emissionFactor are required.",
    });
  }

  if (
    typeof electricityConsumption !== "number" ||
    typeof userState !== "string"
  ) {
    return res.status(400).json({
      error:
        "electricityConsumption must be numbers and emissionFactor must be String.",
    });
  }

  try {
    const filePath = path.join(
      __dirname,
      "/../data/state-wise-emission-factors.json"
    );
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data); // Parse the JSON content
    const emissionFactor = jsonData[userState];
    const carbonFootprint = electricityConsumption * emissionFactor;

    // Respond with the calculated result
    res.status(200).json({
      electricityConsumption,
      emissionFactor,
      carbonFootprint: `${carbonFootprint} kg CO₂`,
    });
  } catch (err) {
    console.error("Error reading or parsing the file:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
