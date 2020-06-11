import axios from "axios";
import {
  SIGNUP_SUCCESS,
  AUTH_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CLOSE_MODAL,
  GET_ALL_BOOKINGS,
} from "../types";
import { toastr } from "react-redux-toastr";
import { setAuthToken } from "../components/utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`/api/auth/`);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
  }
};

export const signUp = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/user/`, data, config);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    toastr.success("Success", "SignUp Success");
    document.getElementById("#closeModal").click();
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
    toastr.error("Error", error.response.data.error);
  }
};

export const logIn = (data, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/auth/`, data, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: CLOSE_MODAL,
    });
    dispatch(loadUser());
    toastr.success("Success", "Login Success");
    document.getElementById("#closeModal").click();
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });

    toastr.error("Error", "Invalid Credentials");
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    toastr.success("Success", "Logout success");
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
  }
};

export const getAllBookings = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/auth/allBookings`);
    dispatch({
      type: GET_ALL_BOOKINGS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
    toastr.error("Error", error.response.data.error);
  }
};
