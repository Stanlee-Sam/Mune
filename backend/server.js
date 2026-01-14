const express = require("express");
const cors = require("cors");

const userRoute = require('./routes/usersRoute.js')
const evaluateRoute = require("./routes/evaluateRoute.js");
const outbreakRoute = require("./routes/outbreakRoute.js");
const clinicRoute = require("./routes/clinicRoute.js");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//evaluate route
app.use("/", evaluateRoute);
//users route
app.use("/users", userRoute);
//outbreak route
app.use('/outbreak', outbreakRoute)
//clinic route
app.use('/clinic', clinicRoute)

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
