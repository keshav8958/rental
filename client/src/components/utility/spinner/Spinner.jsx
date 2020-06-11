import React from "react";
import "./spinner.css";
import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <Loader type="BallTriangle" color="#FF5252" height={80} width={80} />
    </div>
  );
};

export default Spinner;
