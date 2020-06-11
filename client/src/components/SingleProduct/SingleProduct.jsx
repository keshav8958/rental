import React, { useEffect, useState } from "react";
import "./singleproduct.css";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { getProduct, reserveProduct } from "../../actions/productActions";
import Spinner from "../utility/spinner/Spinner";
import ProductImages from "../utility/productImages/ProductImages";

const SingleProduct = ({
  match,
  getProduct,
  product: { product, loading },
  auth: { isAuthenticated },
  reserveProduct,
}) => {
  useEffect(() => {
    getProduct(match.params.pid);
  }, [match.params.pid, getProduct]);

  const [values, setValues] = useState({
    from: "",
    to: "",
  });

  const { from, to } = values;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!from || !to) {
      toastr.error("Error", "Please provide all fields");
    } else {
      reserveProduct(match.params.pid, values);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="container-fluid">
      <div className="row productDetail">
        {product === null ? (
          <Spinner />
        ) : (
          <>
            <div className="col-12">
              <ProductImages images={product.image} />
            </div>
            <div className="row m-auto mt-5 p-5 ">
              <div className="col-md-7">
                <h1 className="main-header-text">{product.name}</h1>
                <p>{product.description}</p>
                <div className="row">
                  <div className="col-md-6">
                    <h2 className="sub-text">Features</h2>
                    <ul>
                      {product.features.split(",").map((feature) => {
                        return <li key={feature}>{feature}</li>;
                      })}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <h2 className="sub-text">Location</h2>
                      <p>{product.address}</p>
                    </div>
                    <div>
                      <h2 className="sub-text">Price</h2>
                      <p>${product.price}/Per Night</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="book-card">
                  <form>
                    <h1 className="main-header-text text-center">
                      Rent Product
                    </h1>
                    <hr />
                    <div className="form-group">
                      <label>
                        <strong>From</strong>
                      </label>
                      <input
                        name="from"
                        type="date"
                        value={from}
                        className="form-control"
                        onChange={handleChange}
                      />
                      <label>
                        <strong>To</strong>
                      </label>
                      <input
                        name="to"
                        type="date"
                        value={to}
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-block btn-outline-dark"
                      onClick={onSubmit}
                      disabled={!isAuthenticated}
                    >
                      Rent Now
                    </button>
                    {!isAuthenticated && (
                      <small>Please login to continue</small>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProduct, reserveProduct })(
  SingleProduct
);
