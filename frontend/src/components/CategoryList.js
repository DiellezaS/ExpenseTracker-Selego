import React, { useEffect, useState } from "react";
import { getCategories } from "../services/api";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <ul>
      {categories.map((cat) => (
        <li key={cat._id}>{cat.name}</li>
      ))}
    </ul>
  );
};

export default CategoryList;
