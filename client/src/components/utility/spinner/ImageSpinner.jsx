import React from "react";
import Img from "react-cool-img";
import loading from "./loading.gif";
import error from "./error.gif";

const ImageSpinner = ({ image, className }) => {
  return (
    <Img
      className={className}
      placeholder={loading}
      src={image}
      error={error}
      cache
      alt="productImage"
    />
  );
};

export default ImageSpinner;
