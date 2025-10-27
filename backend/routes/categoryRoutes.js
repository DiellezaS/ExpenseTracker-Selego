import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ ok: true, data: categories });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST add category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ ok: false, error: "Name is required" });

    const category = await Category.create({ name });
    res.status(201).json({ ok: true, data: category });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
