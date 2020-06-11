import React from "react";
import "./login.css";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { openModal } from "../../../actions/modalActions";
import { signUp } from "../../../actions/authActions";
import { isRequired, combineValidators } from "revalidate";
import TextInput from "../../utility/Input/TextInput";

const validate = combineValidators({
  name: isRequired({ message: "Name Is Required" }),
  email: isRequired({ message: "Email Is Required" }),
  password: isRequired({ message: "Password Is Required" }),
});

const Signup = ({
  history,
  openModal,
  signUp,
  submitting,
  pristine,
  invalid,
  handleSubmit,
}) => {
  const onSubmit = (values) => {
    signUp(values, history);
  };

  return (
    <div className="login-form">
      <h2 className="main-header-text text-center">Sign Up</h2>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field name="name" placeholder="Enter Name" component={TextInput} />
        <Field name="email" placeholder="Enter Email" component={TextInput} />
        <Field
          name="password"
          placeholder="Enter Password"
          component={TextInput}
          type="password"
        />
        <button
          disabled={invalid || submitting || pristine}
          className="btn btn-outline-dark btn-block"
        >
          Sign Up
        </button>
      </form>

      <div className="divider"></div>
      <div>
        Already have an account?
        <span
          onClick={(e) => {
            openModal("login");
          }}
        >
          <span className="text-info">Login</span>
        </span>
      </div>
    </div>
  );
};

export default connect(null, { openModal, signUp })(
  reduxForm({ form: "signUpForm", validate })(Signup)
);
