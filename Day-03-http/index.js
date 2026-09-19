"use strict";

const express = require("express");
const path = require("path");
const { title } = require("process");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // res.send(req.header('host'));

  if (!req.body.name) {
    return res.status(400).send("Name is required");
  }

  res.status(201).send(`Thank you ${req.body.name}`);
});

app.post("/login", (req, res) => {
  if (!req.header("x-auth-token")) {
    return res.status(400).send("No token");
  }

  if (req.header("x-auth-token") !== "123456") {
    return res.status(401).send("Not authorized");
  }

  res.send("Logged In");
});

app.put("/post/:id", (req, res) => {
  // Database stuff will be done here

  res.json({
    id: req.params.id,
    title: req.body.title,
  });
});

const port = 3500;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
