import express from "express";
import { exec } from "child_process";
import cors from "cors";

const app = express();
const PORT = 4000;

// Enable CORS for specific origin
app.use(cors({ origin: "http://localhost:5173" }));

// Define a function to execute the script and handle the response
const updateJsonFile = (req, res) => {
  exec("node src/scripts/fetchApiData.js", (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Script execution error:", error);
      return res
        .status(500)
        .json({ success: false, message: `Error: ${error.message}` });
    }

    if (stderr) {
      console.warn("⚠️ Script stderr:", stderr);
      return res
        .status(500)
        .json({ success: false, message: `Stderr: ${stderr}` });
    }

    console.log("✔️ JSON file updated successfully:", stdout);
    res.json({ success: true, message: "JSON file updated successfully." });
  });
};

app.get("/update-json", updateJsonFile);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Dev server is running at http://localhost:${PORT}`);
});
