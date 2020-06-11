import React from "react";
import "./searchbar.css";

const Searchbar = () => {
  return (
    <div className="search_box">
      <input
        className="search_box"
        type="text"
        placeholder="what are you looking for?"
      />
      <i className="fas fa-search "></i>
    </div>
  );
};

export default Searchbar;
