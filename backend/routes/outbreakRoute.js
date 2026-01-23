const express = require("express");
const {
  postOutbreak,
  fetchOutbreaks,
  updateOutbreak,
  deleteOutbreak,
  fetchSpecificOutbreak
} = require("../controllers/outbreakController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", authMiddleware("VET"), postOutbreak);
router.get("/", fetchOutbreaks);
router.get("/:id", fetchSpecificOutbreak)
router.put("/:id", authMiddleware("VET"), updateOutbreak);
router.delete("/:id", authMiddleware("VET"), deleteOutbreak);

module.exports = router;
