import React from "react";
import { IoSearch, IoCartOutline } from "react-icons/io5";
import { GiSelfLove } from "react-icons/gi";

const Header = () => {
  return (
    <main className="border-b-[1px] border-[#00000050]">
      <div className="max-w-[1170px] flex h-[95px] mx-auto justify-between pt-10 items-center">
        <div className="font-inter font-extrabold text-2xl">
          <p>Exclusive</p>
        </div>
        <div className="text-base font-pops">
          <ul className="flex gap-[48px]">
            <li className="underline decoration-solid">
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Sign Up</a>
            </li>
          </ul>
        </div>
        <div className="flex relative">
          <input className="w-[243px] h-[38px] rounded-md bg-[#F5F5F5] pl-4 placeholder:text-xs" type="text" placeholder="What are you looking for?" />
          <IoSearch size={20} className="absolute top-[7px] right-[12px]" />
        </div>
        <div className="flex gap-4">
          <GiSelfLove size={25} className="cursor-pointer" />
          <IoCartOutline size={25} className="cursor-pointer" />
        </div>
      </div>
    </main>
  );
};

export default Header;
