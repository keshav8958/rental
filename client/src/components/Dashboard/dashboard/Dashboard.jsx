import React from "react";
import "./dashboard.css";
import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import CreateProduct from "../product/CreateProduct";
import UpdateProduct from "../product/UpdateProduct";
import CreateCategory from "../category/CreateCategory";
import UpdateCategory from "../category/UpdateCategory";
import Categories from "../category/Categories";
import Products from "../product/Products";
import Bookings from "../bookings/Bookings";
import AdminRoutes from "../../utils/AdminRoutes";

export const Dashboard = ({ user }) => {
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-xl-2 col-lg-3 col-md-4 dashboard">
          <hr />
          <div className="avatar text-center">
            <img
              src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
              alt=""
            />
            <p className="text-white">{user.name}</p>
            <hr />
          </div>
          <ul className="text-white text-center navbar-nav">
            <li className="nav-item">
              <span className="nav-link p-3 current">Dashboard</span>
            </li>
            <li className="nav-item mb-2 mt-5">
              <Link className="nav-link p-3" to="/dashboard/bookings">
                Bookings
              </Link>
            </li>
            <li className="nav-item mb-2 ">
              <Link className="nav-link p-3" to="/dashboard/products">
                Products
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link p-3" to="/dashboard/createProduct">
                Create Product
              </Link>
            </li>
            {user.role === 1 && (
              <>
                <li className="nav-item mb-2">
                  <Link className="nav-link p-3" to="/dashboard/categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link className="nav-link p-3" to="/dashboard/createCategory">
                    Create Category
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="col-xl-10 col-lg-9 col-md-8">
          <Switch>
            <Route exact path="/dashboard/products" component={Products} />
            <Route
              exact
              path="/dashboard/createProduct"
              component={CreateProduct}
            />
            <Route
              exact
              path="/dashboard/updateproduct/:productId"
              component={UpdateProduct}
            />

            <AdminRoutes
              exact
              path="/dashboard/categories"
              component={Categories}
            />
            <Route
              exact
              path="/dashboard/createCategory"
              component={CreateCategory}
            />
            <Route
              exact
              path="/dashboard/updateCategory/:categoryId"
              component={UpdateCategory}
            />

            <Route exact path="/dashboard/bookings" component={Bookings} />
            <Route exact path="/dashboard/" component={Products} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
