import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import {
  getAllCategory,
  deleteCategory,
} from "../../../actions/CategoryActions";
import Spinner from "../../utility/spinner/Spinner";

const Categories = ({
  category: { categories, loading },
  getAllCategory,
  deleteCategory,
}) => {
  useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);
  return loading ? (
    <Spinner />
  ) : (
    <div className="container p-5">
      <h1 className="main-header-text text-center">Categories</h1>
      <hr />
      <div class="table-responsive">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>

              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, i) => {
              return (
                <tr key={category._id}>
                  <th scope="col">{i + 1}</th>
                  <td>{category.name}</td>
                  <td>
                    <Link
                      to={`/dashboard/updateCategory/${category._id}`}
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
                          onOk: () => deleteCategory(category._id),
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
      {categories.length === 0 && (
        <h2 className="sub-text text-center mt-5">
          No Category Found...
          <br />
          <Link to="/dashboard/createCategory">Create Category</Link>
        </h2>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { getAllCategory, deleteCategory })(
  Categories
);
