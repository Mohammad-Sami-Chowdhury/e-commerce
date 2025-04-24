import React from "react";
import { useRef } from "react";
import Countdown from "react-countdown";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import controller from "../../assets/controller.png";
import keyboard from "../../assets/keyboard.png";
import monitor from "../../assets/monitor.png";
import chair from "../../assets/chair.png";
import { GiSelfLove } from "react-icons/gi";

import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { FaStar, FaStarHalfAlt, FaRegEye } from "react-icons/fa";
import Product from "../Product/Product";

const Today = () => {
  const offerEndTime = "2024-12-31T23:59:59";
  const formatNumber = (num) => String(num).padStart(2, "0");

  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
    <div className="mt-[140px] max-w-[1170px] mx-auto border-b-[1px] border-[#0000005d]">
      <div className="flex gap-x-4 items-center pb-[13px]">
        <div className="bg-[#DB4444] w-5 h-10 rounded-md"></div>
        <p className="text-base font-pops font-bold text-[#DB4444]">Today’s</p>
      </div>
      <div className="flex gap-x-[87px] items-center pb-10">
        <h2 className="text-black font-semibold font-inter text-4xl">
          Flash Sales
        </h2>
        <Countdown
          date={new Date(offerEndTime)}
          renderer={({ days, hours, minutes, seconds }) => (
            <div className="flex gap-x-[17px] items-center">
              <div>
                <p className="font-pops text-xs text-black font-medium">Days</p>
                <h3 className="text-[32px] font-inter text-black font-bold">
                  {formatNumber(days)}
                </h3>
              </div>
              <p className="text-[#db4444] text-4xl font-medium">:</p>
              <div>
                <p className="font-pops text-xs text-black font-medium">
                  Hours
                </p>
                <h3 className="text-[32px] font-inter text-black font-bold">
                  {formatNumber(hours)}
                </h3>
              </div>
              <p className="text-[#db4444] text-4xl font-medium">:</p>
              <div>
                <p className="font-pops text-xs text-black font-medium">
                  Minutes
                </p>
                <h3 className="text-[32px] font-inter text-black font-bold">
                  {formatNumber(minutes)}
                </h3>
              </div>
              <p className="text-[#db4444] text-4xl font-medium">:</p>
              <div>
                <p className="font-pops text-xs text-black font-medium">
                  Seconds
                </p>
                <h3 className="text-[32px] font-inter text-black font-bold">
                  {formatNumber(seconds)}
                </h3>
              </div>
            </div>
          )}
        />
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
      <div className="flex justify-between">
        <Slider className="w-[1170px]" {...settings} ref={sliderRef}>
          <Product
            name={"HAVIT HV-G92 Gamepad"}
            img={controller}
            offer={"-40%"}
            price={"$160"}
            regular={"$120"}
            review={"(88)"}
          />
          <Product
            name={"AK-900 Wired Keyboard"}
            img={keyboard}
            offer={"-35%"}
            price={"$1160"}
            regular={"$960"}
            review={"(75)"}
          />
          <Product
            name={"IPS LCD Gaming Monitor"}
            img={monitor}
            offer={"-30%"}
            price={"$400"}
            regular={"$370"}
            review={"(99)"}
          />
          <Product
            name={"S-Series Comfort Chair "}
            img={chair}
            offer={"-25%"}
            price={"$400"}
            regular={"$370"}
            review={"(99)"}
          />
        </Slider>
      </div>
      <button className="w-[234px] flex justify-center items-center mx-auto h-[56px] bg-[#DB4444] hover:bg-[#e03c3c] rounded-md text-white font-pops font-medium text-base my-[60px]">
        View All Products
      </button>
    </div>
  );
};

export default Today;
