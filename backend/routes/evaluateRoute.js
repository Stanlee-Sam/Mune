const express = require("express");
const router = express.Router();
const { Evaluate } = require("../controllers/evaluateController");

router.post("/evaluate", Evaluate);

module.exports = router;
