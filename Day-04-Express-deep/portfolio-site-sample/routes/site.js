"use strict";
const express = require("express");
const app = express();
const router = express.Router();

app.set("view engine", "ejs");

// 1- Homepage
router.get("/", (req, res) => {
  console.log("Home Page");
  res.render("index.ejs");
});

// 2- Work
router.get("/work", (req, res) => {
  console.log("Work");
  res.render("work.ejs");
});

// 3- About
router.get("/about", (req, res) => {
  console.log("About");
  res.render("about.ejs");
});

// 4- Services
router.get("/services", (req, res) => {
  console.log("Services");
  res.render("services.ejs");
});

// 5- Contact
router.get("/contact", (req, res) => {
  console.log("Contact");
  res.render("contact.ejs");
});

// download
router.get("/portfolio/pdf", (req, res) => {
  console.log("Download PDF portfolio");
  res.download("/Day-04-Express-deep/portfolio-site-sample/files/sunprint-portfolio.pdf");
});

module.exports = router;
