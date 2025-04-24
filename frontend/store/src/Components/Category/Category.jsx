import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const Category = () => {
  return (
    <div className="text-base font-pops border-r-[1px] border-[#00000050] pt-10 pr-4">
      <div className="flex items-center mb-4 gap-x-[51px] cursor-pointer">
        <p>Woman’s Fashion</p>
        <IoIosArrowForward />
      </div>
      <div className="flex items-center mb-4 gap-x-[81px] cursor-pointer">
        <p>Men’s Fashion</p>
        <IoIosArrowForward />
      </div>
      <div className="mb-4 cursor-pointer">
        <p>Electronics</p>
      </div>
      <div className="mb-4 cursor-pointer">
        <p>Home & Lifestyle</p>
      </div>
      <div className="mb-4 cursor-pointer">
        <p>Medicine</p>
      </div>
      <div className="mb-4 cursor-pointer">
        <p>Sports & Outdoor</p>
      </div>
      <div className="mb-4 cursor-pointer">
        <p>Baby’s & Toys</p>
      </div>
      <div className="mb-4 cursor-pointer">
        <p>Groceries & Pets</p>
      </div>
      <div className="cursor-pointer">
        <p>Health & Beauty</p>
      </div>
    </div>
  );
};

export default Category;
