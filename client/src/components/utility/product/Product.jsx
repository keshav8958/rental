import React from "react";
import { Link } from "react-router-dom";
import ImageSpinner from "../spinner/ImageSpinner";

const Product = ({ product: { _id, name, price, image } }) => {
  return (
    <div className="product">
      <Link to={`/product/${_id}`}>
        <div className="image">
          <ImageSpinner className="col-12" image={image[0]} />
        </div>
        <div className="details">
          <div className="title">{name}</div>
          <div className="price-per-night">${price}/Per Day</div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
