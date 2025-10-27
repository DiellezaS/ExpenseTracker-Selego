import express from "express";
import Expense from "../models/Expense.js";
import { sendBudgetAlert } from "../services/emailService.js";

const router = express.Router();
const BUDGET_LIMIT = 1000;

// GET all expenses
router.get("/", async (req, res) => {
  const expenses = await Expense.find();
  return res.json({ ok: true, data: expenses });
});

// POST add expense
router.post("/", async (req, res) => {
  const { categoryId, amount, description } = req.body;
  if (!categoryId || !amount || !description) {
    return res.status(400).json({ ok: false, error: "All fields are required" });
  }

  const expense = await Expense.create({ categoryId, amount, description });

  // Check budget
  const totalExpenses = await Expense.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  const total = totalExpenses[0]?.total || 0;
  if (total > BUDGET_LIMIT) await sendBudgetAlert(total);

  return res.status(201).json({ ok: true, data: expense });
});

// DELETE expense
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Expense.findByIdAndDelete(id);
  return res.json({ ok: true, data: "Deleted successfully" });
});

export default router;
