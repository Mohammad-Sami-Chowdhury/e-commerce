import React from "react";
import iphone from "../../assets/iphone.png";
import apple from "../../assets/iphone-logo.png";
import { FaArrowRight } from "react-icons/fa";

const Sliderr = () => {
  return (
    <div className="mt-10 bg-black w-[892px] h-[344px] flex justify-between items-center">
      <div className="pl-16">
        <div className="flex items-center gap-x-6">
          <img src={apple} alt="apple-logo" />
          <p className="text-white text-base font-pops">iPhone 14 Series</p>
        </div>
        <div>
          <h1 className="text-white font-inter text-5xl font-bold w-[294px] leading-[60px] mt-5">
            Up to 10% off Voucher
          </h1>
        </div>
        <div className="flex items-center text-white font-pops text-base gap-x-2 mt-[22px] cursor-pointer">
          <p className="underline decoration-solid">
            <a href="#">Shop Now</a>
          </p>
          <FaArrowRight size={20} />
        </div>
      </div>
      <img src={iphone} alt="iphone" />
    </div>
  );
};

export default Sliderr;
