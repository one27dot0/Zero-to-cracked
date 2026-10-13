"use strict";
const express = require("express");
const crypto = require("crypto");

const expenseArray = [];

function validateExpenseInput(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "Request body must be a valid JSON object";
  }

  const { fullName, amount, category } = body;

  if (typeof fullName !== "string" || fullName.trim().length === 0) {
    return 'Field "fullName" is required and must be a non-empty String';
  }

  if (typeof amount !== "number" || Number.isNaN(amount) || amount <= 0) {
    return 'Field "amount" is required and must be a positive number';
  }

  if (typeof category !== "string" || category.trim().length === 0) {
    return 'Field "category" is required and must not be an empty string';
  }
  return null;
}
module.exports = validateExpenseInput;
