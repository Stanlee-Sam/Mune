require('dotenv').config();

const { PrismaClient } = require("@prisma/client");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role || "user" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;
    if (!email || !name || !password) {
      return res.status(404).json({ message: "All fields are required!" });
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        location,
      },
    });

    return res.json({
      newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "Failed to register user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ message: "All fields are required!" });
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const accessToken = generateAccessToken(user);

    res.json({
      message: "Login successful!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ message: "Failed to log in user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { location, name } = req.body;
    if (!location && !name) {
      res.status(400).json({ message: "At least one field is required" });
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
       location: location !== undefined ? location : undefined,
        name: name !== undefined ? name : undefined,
      },
    });
    res.json({ updatedUser });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Failed to update user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

module.exports = { registerUser, loginUser, updateUser, getUsers };
