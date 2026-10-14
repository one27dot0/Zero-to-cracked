const express = require("express");
const crypto = require("crypto");

const router = express.Router();
const expenses = require("../data");
const validateExpenseInput = require("../hand-valid");
const { error } = require("console");

router.get("/health", (req, res) => {
  console.log("The route now returns something");
  res.send("Are we Live? Seems so");
});

router.get("/status", (req, res) => {
  console.log("/status route reached");
  res.send({ status: "Live", message: "We are Up and running" });
});

router
  .route("/expenses")
  .get((req, res) => {
    res.json(expenses);
    console.log("Return my whole data");
  })
  .post((req, res) => {
    const validationError = validateExpenseInput(req.body);

    if (validationError) {
      return res.status(400).json({
        error: "Bad request",
        message: validationError,
      });
    }

    const { fullName, amount, category } = req.body;
    const newExpense = {
      id: crypto.randomUUID(),
      fullName: fullName.trim(),
      amount: Number(amount.toFixed(2)),
      category: category.trim(),
      createdAt: new Date().toISOString(),
    };

    expenses.push(newExpense);
    return res.status(201).json(newExpense);
  });

router
  .route("/expenses/:id")
  .get((req, res) => {
    const expense = expenses.find((item) => item.id === req.params.id);
    console.log(expense);

    if (expense) {
      res.status(200).json(expense);
    } else {
      res.status(404).json({
        error: "Not Found",
        message: `There is no expense with that ID ${req.params.id}`,
      });
    }
  })
  .put((req, res) => {
    const findID = expenses.find((ID) => ID.id === req.params.id);

    if (!findID) {
      return res.status(404).json({
        error: "Not Found",
        message: ""
      })
    }

    const { fullName, amount, category } = req.body;
    validateExpenseInput(req.body);
    if (findID) {
      findID.fullName = fullName;
      findID.amount = amount;
      findID.category = category;
    }

    res.status(200).json(findID);
  })
  .delete((req, res) => {
    const index = expenses.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Expense not Found" });
    }

    const deleteItem = expenses.splice(index, 1);

    res.status(204).json({
      message: `Expenses corresponding to ID ${req.params.id} has been Successfully removed`,
      deleteItem,
    });
  });

module.exports = router;
