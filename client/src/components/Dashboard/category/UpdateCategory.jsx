import React, { useEffect } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../utility/Input/TextInput";
import { getCategory, updateCategory } from "../../../actions/CategoryActions";

const UpdateCategory = ({
  match,
  getCategory,
  updateCategory,
  initialValues,
  handleSubmit,
  submitting,
  pristine,
  invalid,
}) => {
  useEffect(() => {
    getCategory(match.params.categoryId);
  }, [match.params.categoryId, getCategory]);
  const onFormSubmit = (values) => {
    updateCategory(values, match.params.categoryId);
  };
  return (
    <div className="container p-5">
      <h1 className="main-header-text text-center">Update Category</h1>
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

const mapStateToProps = (state) => ({
  initialValues: state.category.category,
});

export default connect(mapStateToProps, { getCategory, updateCategory })(
  reduxForm({ form: "updateCategoryForm", enableReinitialize: true })(
    UpdateCategory
  )
);
