import React from "react";
import "./category.css";
import ImageSpinner from "../spinner/ImageSpinner";

const Category = ({ category: { name, _id } }) => {
  const image =
    "https://jssors8.azureedge.net/demos/image-slider/img/faded-monaco-scenery-evening-dark-picjumbo-com-image.jpg";
  return (
    <div className="category col-12">
      <span>
        <div className="image">
          <ImageSpinner className="m-auto" image={image} />
        </div>
        <div className="category-name">{name}</div>
      </span>
    </div>
  );
};

export default Category;
