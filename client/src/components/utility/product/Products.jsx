import React from "react";
import Product from "./Product";
import "./product.css";

const Products = ({ products }) => {
  return (
    <div className="products">
      <div className="row">
        {products.map((product) => {
          return (
            <div key={product._id} className="col-lg-4 col-6 mb-2">
              <Product product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
