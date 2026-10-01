const express = require("express");
const path = require("path");

const router = express.Router();
const app = express();
const memoryArray = require("../data");
const arrayMemory = require("../data");

router.get("/health", (req, res) => {
  console.log("The route now returns something");
  res.send("Are we Live? Seems so");
});

router.get("/status", (req, res) => {
  console.log("/status route reached");
  res.send({ status: "Live", message: "We are Up and running" });
});

router.get("/expenses", (req, res) => {
  res.json(arrayMemory);
  console.log("Return my whole data");
});

router
  .route("/expenses/:id")
  .get((req, res) => {
    /* const index = parseInt(req.params.id) - 1;
    const corrID = arrayMemory[index];
    console.log(corrID);

    if (corrID !== undefined) {
      res.status(200).json(corrID);
    } else {
      res.status(404).send("There is no corresponding data to the ID provided");
    } */

    const id = parseInt(req.params.id);
    const corrID = arrayMemory.find((item) => item.id === id);
    console.log(corrID);

    if (corrID !== undefined) {
      res.status(200).json(corrID);
    } else {
      res.status(404).send("There is no corresponding ID");
    }
  })
  .put((req, res) => {
    res.send(`Update/Replace expense with the ID above ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Remove expense corresponding to the ID ${req.params.id}`);
  });

module.exports = router;
