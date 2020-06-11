import {
  SIGNUP_SUCCESS,
  AUTH_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_ALL_BOOKINGS,
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  allBookings: [],
  loading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuthenticated: true,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case GET_ALL_BOOKINGS:
      return {
        ...state,
        allBookings: action.payload,
      };
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
}
