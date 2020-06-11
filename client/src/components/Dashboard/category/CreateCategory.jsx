import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../utility/Input/TextInput";
import { createCategory } from "../../../actions/CategoryActions";

const CreateCategory = ({
  handleSubmit,
  invalid,
  submitting,
  pristine,
  createCategory,
}) => {
  const onFormSubmit = (values) => {
    createCategory(values);
  };
  return (
    <div className="container p-5">
      <h1 className="main-header-text text-center">Create New Category</h1>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Field name="name" component={TextInput} placeholder="Enter Name" />
        <button
          disabled={invalid || submitting || pristine}
          className="btn btn-outline-dark btn-block"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect(null, { createCategory })(
  reduxForm({ form: "createCategoryForm" })(CreateCategory)
);
