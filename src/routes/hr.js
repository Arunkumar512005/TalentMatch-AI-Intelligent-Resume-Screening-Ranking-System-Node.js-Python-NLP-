const express = require("express");
const multer = require("multer");
const path = require("path");
const { handleHrMatch } = require("../controllers/hrcontroller");

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "uploads"),
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", (req, res) => res.render("hr_dashboard", { results: null }));

router.post("/match", upload.array("resumes", 20), handleHrMatch);

module.exports = router;
