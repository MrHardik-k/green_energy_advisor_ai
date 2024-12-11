import admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";

const serviceAccountPath = resolve(
  "D:/Projects/Mern_Stack/green_energy_advisor_ai/backend/keys/green-energy-advisor-ai-7a0c3-firebase-adminsdk-mb7g6-8e136ee4ab.json"
);
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
