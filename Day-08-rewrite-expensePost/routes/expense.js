const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const memory = require("../data");

function validate(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "request body must be a valid JSON";
  }

  const { fullName, amount, category } = body;

  if (typeof fullName !== "string" || fullName.trim().length === 0) {
    return `Invalid Json value for "fullName"`;
  }

  if (typeof amount !== "number" || Number.isNaN(amount) || amount <= 0) {
    return "Invalid input for Number";
  }

  if (typeof category !== "string" || category.trim().length === 0) {
    return "Invalid input in catgory";
  }

  return null;
}

router
  .route("/expense")
  .get((req, res) => {
    console.log("Return the entire data in Memory");
    res.send(memory);
  })
  .post((req, res) => {
    const validationError = validate(req.body);

    if (validationError) {
      return res.status(404).json({
        error: "bad request",
        message: "Invalid Request",
      });
    }

    const { fullName, amount, category } = req.body;
    const newExpense = {
      id: crypto.randomUUID,
      name: fullName.trim(),
      amount: Number(amount.toFixed(2)),
      category: category.trim(),
      createdAt: new Date().toISOString(),
    };

    memory.push(newExpense);
    return res.status(201).json(newExpense);
  });

module.exports = router;
