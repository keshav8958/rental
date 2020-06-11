import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import { deleteProduct, getAllProduct } from "../../../actions/productActions";
import Spinner from "../../utility/spinner/Spinner";

const Products = ({
  getAllProduct,
  deleteProduct,
  auth: { user },
  product: { products, loading },
}) => {
  useEffect(() => {
    getAllProduct();
  }, [getAllProduct]);
  const userProducts = products.filter(
    (product) => product.user._id === user._id
  );
  const productList = user.role === 1 ? products : userProducts;
  return loading ? (
    <Spinner />
  ) : (
    <div className="container p-5">
      <h1 className="main-header-text text-center">Products</h1>
      <hr />
      <div className="table-responsive">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">CreatedBy</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>

          <tbody>
            {productList.map((product, i) => {
              return (
                <tr key={product._id}>
                  <th scope="col">{i + 1}</th>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.user.name}</td>
                  <td>
                    <Link
                      to={`/dashboard/updateProduct/${product._id}`}
                      className="btn btn-outline-info"
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        const toastrConfirmOptions = {
                          onOk: () => deleteProduct(product._id),
                        };
                        toastr.confirm(
                          "Are you sure about that!",
                          toastrConfirmOptions
                        );
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {productList.length === 0 && (
        <h2 className="sub-text text-center mt-5">
          No Products Found...
          <br />
          <Link to="/dashboard/createProduct">Create Product</Link>
        </h2>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteProduct, getAllProduct })(
  Products
);
