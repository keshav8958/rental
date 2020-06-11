import { OPEN_MODAL, CLOSE_MODAL } from "../types";

const initialState = { isOpen: false, content: "" };

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { isOpen: true, content: action.payload };
    case CLOSE_MODAL:
      return { isOpen: false, content: "" };
    default:
      return state;
  }
}
