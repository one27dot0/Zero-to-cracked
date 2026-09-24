"use strict";
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User List");
});

router.get("/new", (req, res) => {
  (res.render("users/new.ejs"), { firstName: "Test" }); 
});

/* router.get("/:id", (req, res) => {
    res.send(`Get user with ID ${req.params.id}`);
}) */

router
  .route("/:id")
  .get((req, res) => {
    console.log("Get ID");
    res.send(`Get user with ${req.params.id}`);
  })
  .put((req, res) => {
    console.log("Update route");
    res.send(`Update user with ID ${req.params.id}`);
  })
  .delete((req, res) => {
    console.log("Delete ID details");
    res.send(`Remove the ID ${req.params.id}`);
  });

router.param("id", (req, res, next, id) => {
  console.log(id);
  next();
});
module.exports = router;
