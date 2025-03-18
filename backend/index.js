require("dotenv").config();
const express = require("express");
const database = require("./database/database");
const route = require("./route");
const app = express();

const port = 5000;
database();
app.use(express.json());
app.use(route);

app.listen(port, (req, res) => {
  console.log("Back-end is running");
});
