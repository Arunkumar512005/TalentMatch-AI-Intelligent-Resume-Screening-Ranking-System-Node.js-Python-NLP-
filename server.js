const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// ensure uploads dir exists
const uploadsDir = path.join(__dirname, "src", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// view engine & static
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "src", "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
const routes = require("./src/routes");
app.use("/", routes);

app.listen(PORT, () =>
  console.log(`✅ Node server running: http://localhost:${PORT}`)
);
