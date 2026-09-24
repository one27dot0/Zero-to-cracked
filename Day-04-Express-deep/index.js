"use strict";

// Middlewares

/* const express = require("express");
const app = express();

app.use(logger);

app.get("/", (req, res, next) => {
  console.log("Home Page");
  res.send("Home Page");
  next();
});

app.get("/users", auth, (req, res, next) => {
  console.log("User Page");
  res.send("Users Page");
  next();
});

function logger(req, res, next) {
  console.log("Log");
  next();
};

function auth(req, res, next) {
  if (req.query.admin === "true") {
    next();
  } else {
    res.send("No auth");
  }
}

app.listen(3000); */

// Express crash course

const express = require("express");
const app = express();

// Set View engine
app.set("view engine", "ejs");

// Global Middleware
app.use(logger);
app.use(express.static("./public"));

app.get("/", (req, res) => {
  console.log("Active from the / route");
  res.status(200).send("How are you doing today");
});

// Return a JSON format response
app.get("/json", (req, res) => {
  console.log("Jsonn response format");
  res.json({ message: "WHat are you doing currrently" });
});

// Download
app.get("/download", (req, res) => {
  console.log("Download the file.");
  res.download("Index.js");
});

// Render HTML
app.get("/render", (req, res) => {
  console.log("Load the HTML File");
  res.render("index.ejs");
});

const userRouter = require("./routes/users");

app.use("/users", userRouter);

function logger (req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.listen(3500);
