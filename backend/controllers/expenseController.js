import Expense from "../models/Expense.js";
import Category from "../models/Category.js";

// GET /api/expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("categoryId", "name");
    res.status(200).json({ ok: true, data: expenses });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// POST /api/expenses
export const addExpense = async (req, res) => {
  try {
    const { categoryId, amount, description } = req.body;
    if (!categoryId || !amount) return res.status(400).json({ ok: false, error: "Category and amount are required" });

    const expense = new Expense({ categoryId, amount, description });
    await expense.save();

    // Kontrollo buxhetin
    const totalExpenses = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    if (totalExpenses[0]?.total > process.env.BUDGET_LIMIT) {
      console.log(" Budget exceeded! Send email alert");
    }

    res.status(201).json({ ok: true, data: expense });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
