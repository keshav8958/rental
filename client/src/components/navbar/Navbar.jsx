import React from "react";
import "./navbar.css";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { openModal } from "../../actions/modalActions";
import { logOut } from "../../actions/authActions";

const Navbar = ({ openModal, auth: { isAuthenticated }, logOut }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark ">
      <a href="/" className="navbar-brand">
        Rental
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => {
                    logOut();
                  }}
                >
                  logout
                </span>
              </li>
            </>
          )}

          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <span
                  className="nav-link"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal("signup");
                  }}
                >
                  Signup
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal("login");
                  }}
                >
                  Login
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { openModal, logOut })(
  withRouter(Navbar)
);
