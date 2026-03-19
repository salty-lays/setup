import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 store ALL logs
let logs = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// return full history
app.get("/data", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json(logs);
});

// receive new log
app.post("/", (req, res) => {
  const entry = {
    time: new Date().toISOString(),
    data: req.body
  };

  logs.push(entry);

  console.log("Received:", entry);

  res.send("OK");
});

// optional: auto cleanup after 10 min
setInterval(() => {
  const tenMinAgo = Date.now() - 10 * 60 * 1000;
  logs = logs.filter(l => new Date(l.time).getTime() > tenMinAgo);
}, 60 * 1000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running..."));
