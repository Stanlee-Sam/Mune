const express = require("express");
const router = express.Router();
const { Evaluate } = require("../controllers/evaluateController");
const authMiddleware = require('../middleware/authMiddleware.js')

router.post("/evaluate", authMiddleware(), Evaluate);

module.exports = router;
