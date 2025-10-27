import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Categories
export const getCategories = async () => {
  const res = await API.get("/categories");
  return res.data.data;
};

export const addCategory = async (name) => {
  const res = await API.post("/categories", { name });
  return res.data.data;
};

// Expenses
export const getExpenses = async () => {
  const res = await API.get("/expenses");
  return res.data.data;
};

export const addExpense = async (expense) => {
  const res = await API.post("/expenses", expense);
  return res.data.data;
};

export const deleteExpense = async (id) => {
  const res = await API.delete(`/expenses/${id}`);
  return res.data.data;
};

