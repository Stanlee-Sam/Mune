const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  getUsers
} = require("../controllers/usersController.js");

const router = express.Router()

router.get('/', getUsers)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch('/:id', updateUser)

module.exports = router;
