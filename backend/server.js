const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoute = require('./routes/usersRoute.js')
const evaluateRoute = require("./routes/evaluateRoute.js");

const app = express();
const prisma = new PrismaClient();
app.use(express.json());



app.use(
  cors({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/", evaluateRoute);
app.use("/users", userRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
