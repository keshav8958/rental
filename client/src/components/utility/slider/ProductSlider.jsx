import React from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import SlickSlider from "react-slick";
import "./slider.css";

const ProductSlider = ({ elements }) => {
  var settings1 = {
    infinite: true,
    arrows: true,
    dots: true,
    slidesToShow: 1,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slick">
      <SlickSlider {...settings1}>{elements}</SlickSlider>
    </div>
  );
};

export default ProductSlider;
