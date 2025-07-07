const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { parseScript } = require("./openaiClient");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/parse", async (req, res) => {
  const { script } = req.body;
  if (!script) return res.status(400).json({ error: "script is required" });
  try {
    const data = await parseScript(script);
    res.json({ scenes: data.scenes });
  } catch {
    res.status(500).json({ error: "Parsing failed" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));