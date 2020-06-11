import React from "react";
import "./login.css";
import { withRouter } from "react-router-dom";
import { openModal } from "../../../actions/modalActions";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { logIn } from "../../../actions/authActions";
import TextInput from "../../utility/Input/TextInput";

const Login = ({
  history,
  logIn,
  openModal,
  submitting,
  pristine,
  invalid,
  handleSubmit,
}) => {
  const onSubmit = (values) => {
    logIn(values, history);
  };
  return (
    <div className="login-form">
      <div className="main-header-text text-center">Log In</div>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field name="email" placeholder="Enter email" component={TextInput} />
        <Field
          name="password"
          type="password"
          placeholder="Enter Password"
          component={TextInput}
        />
        <button
          disabled={submitting || invalid || pristine}
          className="btn btn-outline-dark btn-block"
        >
          SignUp
        </button>
      </form>
      <div className="divider"></div>
      <div>
        Don't have an account?
        <span
          onClick={(e) => {
            openModal("signup");
          }}
        >
          <span className="text-info">Sign up</span>
        </span>
      </div>
    </div>
  );
};

export default reduxForm({ form: "logInForm" })(
  connect(null, { openModal, logIn })(withRouter(Login))
);
