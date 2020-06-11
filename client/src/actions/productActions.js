import axios from "axios";
import { toastr } from "react-redux-toastr";
import {
  CREATE_PRODUCT,
  PRODUCT_ERROR,
  GET_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAllProduct = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/`);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};

export const getProduct = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/${productId}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/product/`, productData, config);
    dispatch({
      type: CREATE_PRODUCT,
      payload: res.data,
    });
    toastr.success("Success", "Product created successfully");
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: error,
    });
    toastr.error("Error", "An error accured. Plase try again");
  }
};

export const updateProduct = (updatedProduct, productId) => async (
  dispatch
) => {
  try {
    const res = await axios.put(
      `/api/product/${productId}`,
      updatedProduct,
      config
    );
    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data,
    });
    toastr.success("Success", "Product updated successfully");
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: error,
    });

    toastr.error("Error", "An error accured. Plase try again");
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    await axios.delete(`/api/product/${productId}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: productId,
    });
    toastr.success("Success", "Product deleted successfully");
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: error,
    });
    toastr.error("Error", "An error accured. Plase try again");
  }
};

export const reserveProduct = (productId, data) => async (dispatch) => {
  try {
    await axios.post(`/api/product/reserve/${productId}`, data, config);
    toastr.success("Success", "Product reserved successfully");
  } catch (error) {
    toastr.warning("Error", error.response.data.error);
  }
};
