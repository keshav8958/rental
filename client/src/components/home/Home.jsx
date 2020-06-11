import React, { useEffect } from "react";
import "./home.css";
import Searchbar from "../searchbox/Searchbar";
import { connect } from "react-redux";
import Categories from "../utility/categories/Categories";
import Products from "../utility/product/Products";
import Skeleton from "react-loading-skeleton";
import { getAllProduct } from "../../actions/productActions";
import { getAllCategory } from "../../actions/CategoryActions";

const Home = ({
  getAllProduct,
  getAllCategory,
  product: { products, loading },
  category: { categories },
}) => {
  useEffect(() => {
    getAllProduct();
    getAllCategory();
  }, [getAllProduct, getAllCategory]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="home col-12">
          <div className="upper-fold ">
            <div className="main">
              <h1 className="main-header">Rent Anything You Want</h1>
              <Searchbar />
            </div>
          </div>
        </div>
      </div>

      <div className="row lower-fold">
        <div className="col-12 categories">
          <h1 className="main-header-text">Browse By Categories</h1>
          {categories.length === 0 || !categories ? (
            <Skeleton count={1} height={150} />
          ) : (
            <Categories categories={categories} />
          )}
        </div>
        <div className="col-12 products">
          <h1 className="main-header-text">Recommaned Products</h1>
          {loading || products.length === 0 || !products ? (
            <Skeleton count={3} height={125} />
          ) : (
            <Products products={products} />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  category: state.category,
});

export default connect(mapStateToProps, { getAllProduct, getAllCategory })(
  Home
);
