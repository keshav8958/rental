import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import ImageInput from "../../utility/Input/ImageInput";
import TextInput from "../../utility/Input/TextInput";
import OptionInput from "../../utility/Input/OptionInput";
import { getProduct, updateProduct } from "../../../actions/productActions";
import { getAllCategory } from "../../../actions/CategoryActions";
import TextArea from "../../utility/Input/TextArea";

const UpdateProduct = ({
  updateProduct,
  getAllCategory,
  match,
  // product: { product, loading },
  category,
  getProduct,
  initialValues,
  handleSubmit,
  invalid,
  submitting,
  pristine,
}) => {
  useEffect(() => {
    getProduct(match.params.productId);
    getAllCategory();
  }, [getProduct, getAllCategory, match.params.productId]);

  const [images, setImages] = useState([]);
  const onFormSubmit = (values) => {
    if (images.length > 3) {
      values.image = images;
    }
    updateProduct(values, match.params.productId);
  };
  return (
    <div className="container p-5">
      <h1 className="main-header-text text-center">Update Product</h1>
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
          placeholder="Features"
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
  initialValues: state.product.product,
  product: state.product,
  category: state.category,
});

export default connect(mapStateToProps, {
  getProduct,
  updateProduct,
  getAllCategory,
})(
  reduxForm({ form: "updateProductForm", enableReinitialize: true })(
    UpdateProduct
  )
);
