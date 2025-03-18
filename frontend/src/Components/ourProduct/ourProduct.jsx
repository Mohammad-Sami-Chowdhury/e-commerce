import React from "react";
import { useRef } from "react";
import Countdown from "react-countdown";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import catfood from "../../assets/catFood.png";
import cream from "../../assets/cream.png";
import camera from "../../assets/camera.png";
import laptop from "../../assets/laptop.png";

import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Product from "../Product/Product";

const OurProduct = () => {
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="max-w-[1170px] mb-[170px] mx-auto">
      <div className="flex gap-x-4 items-center pb-[13px]">
        <div className="bg-[#DB4444] w-5 h-10 rounded-md"></div>
        <p className="text-base font-pops font-bold text-[#DB4444]">
          Our Products
        </p>
      </div>
      <div className="flex gap-x-[87px] items-center pb-10">
        <h2 className="text-black font-semibold font-inter text-4xl">
          Explore Our Products
        </h2>
        <div className="flex items-center gap-x-2 ml-auto">
          <div
            onClick={handlePrev}
            className="bg-[#F5F5F5] rounded-full w-[46px] h-[46px] flex items-center justify-center cursor-pointer"
          >
            <FaArrowLeftLong size={20} />
          </div>
          <div
            onClick={handleNext}
            className="bg-[#F5F5F5] rounded-full w-[46px] h-[46px] flex items-center justify-center cursor-pointer"
          >
            <FaArrowRightLong size={20} />
          </div>
        </div>
      </div>
      <div className="slider-container">
        <Slider className="w-[1170px]" {...settings} ref={sliderRef}>
          <div className="pb-[60px]">
            <Product
              name={"HAVIT HV-G92 Gamepad"}
              img={catfood}
              offer={"-40%"}
              price={"$160"}
              regular={"$120"}
              review={"(88)"}
            />
          </div>
          <div className="pb-[60px]">
            <Product
              name={"AK-900 Wired Keyboard"}
              img={cream}
              offer={"-35%"}
              price={"$1160"}
              regular={"$960"}
              review={"(75)"}
            />
          </div>
          <div className="pb-[60px]">
            <Product
              name={"IPS LCD Gaming Monitor"}
              img={camera}
              offer={"-30%"}
              price={"$400"}
              regular={"$370"}
              review={"(99)"}
            />
          </div>
          <div className="pb-[60px]">
            <Product
              name={"S-Series Comfort Chair "}
              img={laptop}
              offer={"-25%"}
              price={"$400"}
              regular={"$370"}
              review={"(99)"}
            />
          </div>
        </Slider>
      </div>
      <button className="w-[234px] flex justify-center items-center mx-auto h-[56px] bg-[#DB4444] hover:bg-[#e03c3c] rounded-md text-white font-pops font-medium text-base mb-[60px]">
        View All Products
      </button>
    </div>
  );
};

export default OurProduct;
