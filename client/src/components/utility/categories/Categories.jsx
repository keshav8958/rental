import React from "react";
import Category from "./Category";
import Slider from "../slider/Slider";

const Categories = ({ categories }) => {
  return (
    <Slider
      elements={categories.map((category, i) => (
        <Category key={i} category={category} />
      ))}
    />
  );
};

export default Categories;
