const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  getUsers,
} = require("../controllers/usersController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put(
  "/:id",
  authMiddleware(),
  (req, res, next) => {
    if (req.user.userId !== req.params.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: cannot update another user" });
    }
    next();
  },
  updateUser
);

module.exports = router;
