import * as fs from "fs";
import https from "https";
import fetch from "node-fetch";

const API_URL = "https://localhost:44310/api/Resource/All";
const agent = new https.Agent({ rejectUnauthorized: false });

const toCamelCase = (str) => {
  if (!str) return "";
  return str
    .replace(/[-_]+(.)/g, (_, group) => group.toUpperCase())
    .replace(/^./, (group) => group.toLowerCase());
};

const processResources = (resources) => {
  return resources.reduce((acc, { id, name, description, page }) => {
    const camelCaseName = toCamelCase(name);
    acc[camelCaseName] = { id, name, description, page };
    return acc;
  }, {});
};

export const fetchResourceApiData = async () => {
  try {
    console.log(`Fetching data from ${API_URL}...`);

    const response = await fetch(API_URL, { agent });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const { data } = await response.json();

    const processedData = Object.fromEntries(
      Object.entries(data).map(([key, resources]) => [
        key,
        processResources(resources),
      ])
    );

    saveDataToFile(processedData, "src/json/allResourceData.json");
  } catch (error) {
    console.error("❌ Error fetching data:", error);
  }
};

const saveDataToFile = (data, filePath) => {
  const currentData = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath))
    : null;

  if (JSON.stringify(currentData) === JSON.stringify(data)) {
    console.log("⏩ No changes detected. Skipping save.");
    return;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`✔️ Data successfully saved to ${filePath}`);
};

fetchResourceApiData();
