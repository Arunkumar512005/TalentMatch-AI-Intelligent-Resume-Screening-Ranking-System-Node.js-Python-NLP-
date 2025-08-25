const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.redirect("/student"));

router.use("/student", require("./student"));
router.use("/hr", require("./hr"));

module.exports = router;
