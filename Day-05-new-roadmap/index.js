"use strict";

const fs = require("fs");
const express = require("express");

const app = express();

// Simple Express CRUD operation

app.get("/", (req, res) => {
  console.log("HomePage is active");
  res.send("This is the homepage");
});

app.get("/users", (req, res) => {
  console.log("User Data Page");
  res.send("This is the page for the user Data");
});

app.post("/users", (rreq, res) => {
  console.log("Register new user");
  res.send("Input your details to register");
});

app.put("/users/:id", (req, res) => {
  console.log("Update user data");
  res.send(`Update the data of user ID ${req.params.id}`);
});

app.delete("/users/:id", (req, res) => {
  console.log("Remove User");
  res.send(`Delete Data of user with ID ${req.params.id}`);
});

app.listen(3500);
