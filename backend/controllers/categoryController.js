import Category from "../models/Category.js";
import { sendBudgetAlert } from "../services/emailService.js";


// GET /api/categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) return res.status(404).json({ ok: false, error: "No categories found" });

    res.status(200).json({ ok: true, data: categories });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ ok: false, error: "Name is required" });

    const category = new Category({ name });
    await category.save();
    res.status(201).json({ ok: true, data: category });
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


    const totalExpenses = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    if (totalExpenses[0]?.total > Number(process.env.BUDGET_LIMIT)) {
      await sendBudgetAlert(totalExpenses[0].total);
    }

    res.status(201).json({ ok: true, data: expense });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
