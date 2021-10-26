const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

// db config ....

// middlewares
app.use(express.json());

app.listen(4000, () => {
  console.log("server running on port 4000");
});

app.get("/", (req, res) => {
  res.json("hi");
});
