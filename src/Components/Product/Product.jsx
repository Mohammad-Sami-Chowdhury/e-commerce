import React from "react";
import { GiSelfLove } from "react-icons/gi";
import { FaStar, FaStarHalfAlt, FaRegEye } from "react-icons/fa";

const Product = (props) => {
  return (
    <div>
      <div className="group">
        <div className="w-[270px] group relative h-[210px] bg-[#f5f5f5] p-[49px] flex justify-center items-center rounded-t-lg">
          <img src={props.img} alt="" />
          <div className="bg-[#db4444] px-3 py-1 rounded-sm absolute top-3 left-3">
            <p className="text-white text-xs font-pops">{props.offer}</p>
          </div>
          <div className="cursor-pointer h-[34px] w-[34px] bg-white text-black rounded-full flex justify-center absolute top-3 right-3 items-center">
            <GiSelfLove size={16} />
          </div>
          <div className="cursor-pointer h-[34px] w-[34px] bg-white text-black rounded-full flex justify-center absolute top-[54px] right-3 items-center">
            <FaRegEye />
          </div>
        </div>
        <div className="w-[270px] duration-500 rounded-b-lg h-[40px] group-hover:text-white font-pops font-medium text-base text-[#f5f5f5] bg-[#f5f5f5] group-hover:bg-black text-center py-2">
          Add To Cart
        </div>
        <p className="text-base text-[#000000] font-medium font-pops pt-4">
          {props.name}
        </p>
      </div>
      <div className="flex gap-x-3 pt-2">
        <p className="text-base text-[#db4444] font-medium font-pops">{props.price}</p>
        <p className="line-through text-base text-[#00000080] font-medium font-pops">
          {props.regular}
        </p>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="flex text-[#FFAD33] text-base pt-2">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <p className="text-[#00000080]">{props.review}</p>
      </div>
    </div>
  );
};

export default Product;
