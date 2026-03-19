import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let latestText = "No data received yet";

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/data", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.send(latestText);
});

app.post("/", (req, res) => {
  latestText = req.body || "Empty";
  console.log("Received:", latestText);
  res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running..."));
