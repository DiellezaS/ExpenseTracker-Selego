import React, { useEffect, useState } from "react";
import { getExpenses } from "../services/api";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses().then(setExpenses);
  }, []);

  return (
    <ul>
      {expenses.map((exp) => (
        <li key={exp._id}>
          {exp.categoryId.name} - ${exp.amount} - {exp.description}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
