import React, { useState } from "react";

function AddCategory({ onAddCategory }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddCategory(name.trim());
    setName("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: "10px" }}>Add</button>
      </form>
    </div>
  );
}

export default AddCategory;
