import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../utility/Input/TextInput";
import ImageInput from "../../utility/Input/ImageInput";
import OptionInput from "../../utility/Input/OptionInput";
import { createProduct } from "../../../actions/productActions";
import { toastr } from "react-redux-toastr";
import {
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
} from "revalidate";
import { getAllCategory } from "../../../actions/CategoryActions";
import TextArea from "../../utility/Input/TextArea";

const validate = combineValidators({
  name: isRequired({ message: "Name is Required" }),
  category: isRequired({ message: "Catgeory is Required" }),
  address: isRequired({ message: "address is Required" }),
  city: isRequired({ message: "city is Required" }),
  country: isRequired({ message: "country is Required" }),
  price: isRequired({ message: "price is Required" }),
  description: hasLengthGreaterThan(200)({
    message: "Minimum 250 characters are required",
  }),
  features: isRequired({ message: "features is Required" }),
});

const CreateProduct = ({
  category,
  createProduct,
  getAllCategory,
  handleSubmit,
  invalid,
  submitting,
  pristine,
}) => {
  useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);
  const [images, setImages] = useState([]);

  const onFormSubmit = (values) => {
    if (images.length < 3) {
      toastr.warning("Error", "Minimum 3 images are required");
    } else {
      values.image = images;
      createProduct(values);
    }
  };

  return (
    <div className="container p-5">
      <h1 className="main-header-text text-center">Create New Product</h1>
      <hr />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <ImageInput setImages={setImages} />
        <Field name="name" component={TextInput} placeholder="Name" />
        <Field
          name="category"
          component={OptionInput}
          categories={category.categories}
        />
        <Field name="address" component={TextInput} placeholder="Address" />
        <Field name="city" component={TextInput} placeholder="City" />
        <Field name="country" component={TextInput} placeholder="Country" />

        <Field
          name="price"
          component={TextInput}
          placeholder="Price"
          type="number"
        />

        <Field
          name="description"
          component={TextArea}
          placeholder="Enter Description"
        />

        <Field
          name="features"
          component={TextInput}
          placeholder="Enter Features"
          small={true}
        />

        <button
          className="btn btn-outline-dark btn-block"
          disabled={invalid || submitting || pristine}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { createProduct, getAllCategory })(
  reduxForm({ form: "createProductForm", validate })(CreateProduct)
);
