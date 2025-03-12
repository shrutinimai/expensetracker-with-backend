const Expense = require("../models/expense");

exports.getExpenses = async (_req, res) => {
  try 
  {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } 
  catch (err) 
  {
    res.status(500).json({ error: "Error fetching expenses" });
  }
};

exports.createExpense = async (req, res) => {
  try 
  {
    const expense = await Expense.create(req.body);
    res.json(expense);
  }
   catch (err)
    {
    res.status(500).json({ error: "Error creating expense" });
  }
};

exports.deleteExpense = async (req, res) => {
  try 
  {
    await Expense.destroy({ where: { id: req.params.id } });
    res.json({ message: "Expense deleted" });
  } 
  catch (err)
   {
    res.status(500).json({ error: "Error deleting expense" });
  }
};

exports.updateExpense = async (req, res) => {
  try
   {
    await Expense.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Expense updated" });
  } 
  catch (err) 
  {
    res.status(500).json({ error: "Error updating expense" });
  }
};
