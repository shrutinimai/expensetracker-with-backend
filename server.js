const express = require("express");

const bodyParser = require("body-parser");

const sequelize = require("./database");

const expenseRoutes = require("./routes/expenseRoutes");

const Expense = require("./models/expense");

const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/expenses", expenseRoutes);

sequelize.sync()
  .then(() => console.log("Tables created successfully."))
  .catch((err) => console.error("Error creating tables:", err));


app.get("/expenses", async (_req, res) => {
  const expenses = await Expense.findAll();
  res.json(expenses);
});

app.get('/expenses/:id', (req, res) => {
  const expense = expenses.find(exp => exp.id === parseInt(req.params.id));
  if (!expense) return res.status(404).json({ message: "Expense not found" });
  res.json(expense);
});

app.post("/expenses", async (req, res) => {
  const expense = await Expense.create(req.body);
  res.json(expense);
});

app.delete("/expenses/:id", async (req, res) => {
  await Expense.destroy({ where: { id: req.params.id } });
  res.json({ message: "Expense deleted" });
});

app.put("/expenses/:id", async (req, res) => {
  await Expense.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Expense updated" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
