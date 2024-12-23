import React from "react";
import Category from "../Category/Category";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sliderr from "../Slider/Sliderr";
import "../Slider/Sliderr.css"

const Banner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <main className="max-w-[1170px] mx-auto">
      <div className="flex justify-between">
        <Category />
        <Slider className="w-[892px]" {...settings}>
          <Sliderr/>
          <Sliderr/>
          <Sliderr/>
        </Slider>
      </div>
    </main>
  );
};

export default Banner;
