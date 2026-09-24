"use strict";
const express = require("express");
const app = express();

const getRoutes = require("./routes/site");

app.use("/app", getRoutes);

app.listen(8000);
