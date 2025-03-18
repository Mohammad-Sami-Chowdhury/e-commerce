import React from "react";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiMobile3, CiCamera } from "react-icons/ci";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaHeadphones,
} from "react-icons/fa6";
import { RiComputerLine } from "react-icons/ri";
import { BsSmartwatch } from "react-icons/bs";
import { SiYoutubegaming } from "react-icons/si";

const Categories = () => {
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
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
    <div className="mt-[80px] pb-[80px] max-w-[1170px] mx-auto border-b-[1px] border-[#0000005d]">
      <div className="flex gap-x-4 items-center pb-[13px]">
        <div className="bg-[#DB4444] w-5 h-10 rounded-md"></div>
        <p className="text-base font-pops font-bold text-[#DB4444]">Today’s</p>
      </div>
      <div className="flex pb-10">
        <h2 className="text-black font-semibold font-inter text-4xl">
          Flash Sales
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
      <div className="flex justify-between">
        <Slider className="w-[1170px]" {...settings} ref={sliderRef}>
          <div>
            <div className="px-10 py-6 border-[1px] border-[#0000005d] w-[170px] h-[145px] hover:bg-[#DB4444] duration-500 hover:text-white">
              <CiMobile3 className="mx-auto" size={60} />
              <p className="text-base font-pops text-center">Phones</p>
            </div>
          </div>
          <div>
            <div className="px-10 py-6 border-[1px] border-[#0000005d] w-[170px] h-[145px] hover:bg-[#DB4444] duration-500 hover:text-white">
              <RiComputerLine className="mx-auto" size={60} />
              <p className="text-base font-pops text-center">Computers</p>
            </div>
          </div>
          <div>
            <div className="px-10 py-6 border-[1px] border-[#0000005d] w-[170px] h-[145px] hover:bg-[#DB4444] duration-500 hover:text-white">
              <BsSmartwatch className="mx-auto" size={60} />
              <p className="text-base font-pops text-center">SmartWatch</p>
            </div>
          </div>
          <div>
            <div className="px-10 py-6 border-[1px] border-[#0000005d] w-[170px] h-[145px] hover:bg-[#DB4444] duration-500 hover:text-white">
              <CiCamera className="mx-auto" size={60} />
              <p className="text-base font-pops text-center">Camera</p>
            </div>
          </div>
          <div>
            <div className="px-10 py-6 border-[1px] border-[#0000005d] w-[170px] h-[145px] hover:bg-[#DB4444] duration-500 hover:text-white">
              <FaHeadphones className="mx-auto" size={60} />
              <p className="text-base font-pops text-center">HeadPhones</p>
            </div>
          </div>
          <div>
            <div className="px-10 py-6 border-[1px] border-[#0000005d] w-[170px] h-[145px] hover:bg-[#DB4444] duration-500 hover:text-white">
              <SiYoutubegaming className="mx-auto" size={60} />
              <p className="text-base font-pops text-center">Gaming</p>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Categories;
