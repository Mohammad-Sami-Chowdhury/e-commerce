import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Offer = () => {
  const [down, setDown] = useState(false);

  const handleDropdown = () => {
    setDown(!down);
  };

  return (
    <main className="bg-black">
      <div className=" text-white text-[14px] h-[48px] font-pops flex items-center justify-center max-w-[1170px] mx-auto">
        <p className="text-center mx-auto">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <a className="font-bold pl-2 underline decoration-solid" href="#">
            ShopNow
          </a>
        </p>
        <div className="ml-auto">
          <p
            onClick={handleDropdown}
            className="flex justify-center items-center gap-1 cursor-pointer"
          >
            English <IoIosArrowDown size={20} />{" "}
          </p>
          {
            down && (
              <div className="absolute bg-[#00000080] px-5 py-5">
                <ul>
                  <li className="pb-1">English</li>
                  <li className="pb-1">Bangla</li>
                  <li className="pb-1">Arabic</li>
                  <li className="pb-1">Hindi</li>
                  <li className="pb-1">Chinese</li>
                </ul>
              </div>
            )
          }
        </div>
      </div>
    </main>
  );
};

export default Offer;
