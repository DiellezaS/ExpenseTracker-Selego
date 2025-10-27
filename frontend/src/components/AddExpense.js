import React, { useState } from "react";

function AddExpense({ categories, onExpenseAdded }) {
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryId || !amount || !description) return;

    onExpenseAdded({
      categoryId,
      amount: parseFloat(amount),
      description,
    });

    // reset form
    setCategoryId("");
    setAmount("");
    setDescription("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button type="submit" style={{ marginLeft: "10px" }}>Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
