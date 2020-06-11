import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import modalReducer from "./modalReducer";
import productReducer from "./productReducer";
import categoryReducer from "./CategoryReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
import { reducer as FormReducer } from "redux-form";

export default combineReducers({
  form: FormReducer,
  toastr: toastrReducer,
  auth: AuthReducer,
  product: productReducer,
  modal: modalReducer,
  category: categoryReducer,
});
