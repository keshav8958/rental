import React from "react";
import "./productImages.css";
import ProductSlider from "../slider/ProductSlider";
const productImages = ({ images }) => {
  return (
    <div className="productImage">
      <ProductSlider
        elements={images.map((image, i) => {
          return (
            <div key={i}>
              <img src={image} alt="" className="m-auto col-5 p-1" />
            </div>
          );
        })}
      />
    </div>
  );
};

export default productImages;
