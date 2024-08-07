const express = require("express");
const userRoute = require("./routes/userRoute");
const dbConnection = require("./config/dbConnection");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

dbConnection();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
