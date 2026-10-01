"use strict";
const fs = require("fs");
const express = require("express");

const app = express();
const routerFile = require("./routes/router");
const memoryArray = require("./data");
const { error } = require("console");

app.use("/", routerFile);

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot process this request because You dey MaDDD!`,
  });
});

app.listen(3000);
