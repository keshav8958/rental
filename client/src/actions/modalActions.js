import { OPEN_MODAL, CLOSE_MODAL } from "../types";

export const openModal = (content) => {
  return {
    type: OPEN_MODAL,
    payload: content,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};
