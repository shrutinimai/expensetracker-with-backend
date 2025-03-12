const express = require("express");

const { getExpenses, createExpense, deleteExpense, updateExpense } = require("../controllers/expenseController");

const router = express.Router();

router.get("/", getExpenses);

router.post("/", createExpense);

router.delete("/:id", deleteExpense);

router.put("/:id", updateExpense);

module.exports = router;
