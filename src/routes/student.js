const express = require("express");
const multer = require("multer");
const path = require("path");
const { handleStudentMatch } = require("../controllers/studentcontroller");

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "uploads"),
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", (req, res) => res.render("student_dashboard", { result: null }));

router.post("/match", upload.single("resume"), handleStudentMatch);

module.exports = router;
