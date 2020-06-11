import axios from "axios";
import { toastr } from "react-redux-toastr";
import {
  CREATE_CATEGORY,
  CATEGORY_ERROR,
  UPDATE_CATEGORY,
  GET_CATEGORY,
  GET_CATEGORIES,
  DELETE_CATEGORY,
} from "../types";
// const API = "http://localhost:8000/api";

export const getAllCategory = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/category`);
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error,
    });
  }
};

export const createCategory = (name) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const res = await axios.post(`/api/category/`, name, config);
    dispatch({
      type: CREATE_CATEGORY,
      payload: res.data,
    });
    toastr.success("Success", "Category Created Successfully");
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error.response.data,
    });
    toastr.error("Error", error.response.data.error);
  }
};

export const getCategory = (categoryId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/category/${categoryId}`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error,
    });
  }
};

export const updateCategory = (name, categoryId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const res = await axios.put(`/api/category/${categoryId}`, name, config);
    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data,
    });
    toastr.success("Updated", "Category updated successfully");
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error,
    });
    toastr.error("Error", error.response.data.error);
  }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    await axios.delete(`/api/category/${categoryId}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: categoryId,
    });
    toastr.success("Deleted", "Category deleted successfully");
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: error,
    });
    toastr.error("Error", error.response.data.error);
  }
};
