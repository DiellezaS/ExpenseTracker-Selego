import React, { useEffect, useState } from "react";
import {
  getCategories,
  getExpenses,
  addExpense,
  addCategory,
  deleteExpense,
} from "./services/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

function App() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgetExceeded, setBudgetExceeded] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [expenseForm, setExpenseForm] = useState({
    categoryId: "",
    amount: "",
    description: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const catData = await getCategories();
    const expData = await getExpenses();
    setCategories(catData);
    setExpenses(expData);

    const total = expData.reduce((sum, e) => sum + e.amount, 0);
    setBudgetExceeded(total > 1000);
  };


  const handleAddCategory = async () => {
    const trimmedName = newCategory.trim();
    if (!trimmedName) return;
    const exists = categories.some(
        (cat) => cat.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (exists) {
        alert("This category already exists!");
        return;
    }

    await addCategory(trimmedName);
    setNewCategory("");
    fetchData();
  };


  const handleAddExpense = async () => {
    const { categoryId, amount, description } = expenseForm;
    if (!categoryId || !amount || !description) return;

    await addExpense({
      categoryId,
      amount: Number(amount),
      description,
    });

    setExpenseForm({ categoryId: "", amount: "", description: "" });
    fetchData();
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    fetchData();
  };



  // Line chart data grouped by date
  const lineData = Object.values(
    expenses.reduce((acc, exp) => {
      const date = new Date(exp.createdAt).toLocaleDateString();
      if (!acc[date]) acc[date] = { date, total: 0 };
      acc[date].total += exp.amount;
      return acc;
    }, {})
  );

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Pie chart data
  const chartData = categories
    .map((cat) => {
      const totalForCategory = expenses
        .filter((e) => e.categoryId === cat._id)
        .reduce((sum, e) => sum + e.amount, 0);
      return { name: cat.name, value: totalForCategory };
    })
    .filter((item) => item.value > 0);

  const COLORS = ["#A8D5BA", "#FFD6A5", "#FFADAD", "#CDB4DB", "#9BF6FF", "#FFE5B4"];
  const budgetPercent = Math.min((totalExpenses / 1000) * 100, 100);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Expense Tracker</h1>

      {/* Budget Card */}
      <div
        style={{
          backgroundColor: budgetExceeded ? "#ffdddd" : "#ddffdd",
          padding: "15px 20px",
          borderRadius: "10px",
          fontWeight: "bold",
          marginBottom: "30px",
          textAlign: "center",
          fontSize: "18px",
        }}
      >
        Total Expenses: ${totalExpenses}{" "}
        {budgetExceeded && "⚠️ Budget limit exceeded!"}
        <div style={{ background: "#ccc", borderRadius: "5px", height: "15px", marginTop: "10px", overflow: "hidden" }}>
          <div
            style={{
              width: `${budgetPercent}%`,
              background: budgetExceeded ? "#dc3545" : "#28a745",
              height: "100%",
              transition: "width 0.3s",
            }}
          />
        </div>
      </div>

     {/* Dashboard Cards */}
<div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
  {/* Categories Card */}
  <div style={{ flex: "1", minWidth: "250px", backgroundColor: "#f0f8ff", padding: "20px", borderRadius: "15px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
    <h3 style={{ marginBottom: "15px" }}>Categories</h3>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
      {categories.map((cat, index) => (
        <span
          key={cat._id}
          style={{
            padding: "6px 12px",
            borderRadius: "20px",
            backgroundColor: COLORS[index % COLORS.length],
            color: "#fff",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          {cat.name}
        </span>
      ))}
    </div>
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        placeholder="New category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        style={{ flex: "1", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
      />
      <button
        onClick={handleAddCategory}
        style={{
          padding: "8px 15px",
          borderRadius: "8px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </div>
  </div>

  {/* Add Expense Card */}
  <div style={{ flex: "1", minWidth: "300px", backgroundColor: "#fff0f5", padding: "20px", borderRadius: "15px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
    <h3 style={{ marginBottom: "15px" }}>Add Expense</h3>
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <select
        value={expenseForm.categoryId}
        onChange={(e) => setExpenseForm({ ...expenseForm, categoryId: e.target.value })}
        style={{ flex: "1", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={expenseForm.amount}
        onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
        style={{ flex: "1", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
      />
      <input
        type="text"
        placeholder="Description"
        value={expenseForm.description}
        onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
        style={{ flex: "2", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
      />
      <button
        onClick={handleAddExpense}
        style={{
          padding: "8px 15px",
          borderRadius: "8px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </div>
  </div>
</div>

{/* Charts Row */}
<div
  style={{
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "30px",
  }}
>
  {/* Pie Chart */}
  {chartData.length > 0 && (
    <div
      style={{
        flex: "1 1 500px",
        maxWidth: "600px",
        backgroundColor: "#f8f9fa",
        padding: "10px",
        borderRadius: "15px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h3>Expenses by Category</h3>
      <PieChart width={500} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  )}

  {/* Line Chart */}
  <div
    style={{
      flex: "1 1 500px",
      maxWidth: "600px",
      backgroundColor: "#f8f9fa",
      padding: "10px",
      borderRadius: "15px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      textAlign: "center",
    }}
  >
    <h3>Expense Trends Over Time</h3>
    <LineChart width={500} height={300} data={lineData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="total" stroke="#8884d8" />
    </LineChart>
  </div>
</div>
     
      {/* Expenses Table Card */}
<div
  style={{
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  }}
>
  <h2 style={{ marginBottom: "15px" }}>Expenses</h2>
  {expenses.length === 0 ? (
    <p style={{ textAlign: "center", color: "#555" }}>No expenses yet.</p>
  ) : (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          minWidth: "600px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#7dbcffff", color: "#fff", textAlign: "left" }}>
            <th style={{ padding: "10px", borderRadius: "8px 0 0 0px" }}>Description</th>
            <th style={{ padding: "10px" }}>Amount</th>
            <th style={{ padding: "10px" }}>Category</th>
            <th style={{ padding: "10px", borderRadius: "0 8px 0px 0" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, index) => {
            const category = categories.find((c) => c._id === exp.categoryId);
            return (
              <tr
                key={exp._id}
                style={{
                  backgroundColor: "#fff" ,
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td style={{ padding: "10px" }}>{exp.description}</td>
                <td style={{ padding: "10px" }}>${exp.amount}</td>
                <td style={{ padding: "10px" }}>{category ? category.name : "Unknown"}</td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => handleDeleteExpense(exp._id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      backgroundColor: "#fe7885ff",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )}
</div>

    </div>
  );
}

export default App;
