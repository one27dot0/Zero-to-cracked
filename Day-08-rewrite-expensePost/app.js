const express = require("express");
const app = express();

const router = require("./routes/expense");

app.use(express.json());

app.use("/", router);

module.exports = app;
