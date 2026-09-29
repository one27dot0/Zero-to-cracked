"use strict"
const fs = require("fs");
const express = require("express");

const app = express();

app.get("/health", (req, res) => {
    console.log("The route now returns something");
    res.send("Are we Live? Seems so");
});

aap.listen(3000);