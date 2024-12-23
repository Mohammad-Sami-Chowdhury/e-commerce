import React from "react";
import play from "../../assets/play.png";
import girl from "../../assets/girl.png";
import speaker from "../../assets/speaker.png";
import perfume from "../../assets/perfume.png";
import { TbTruckDelivery, TbHeadphones } from "react-icons/tb";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

const Feature = () => {
  return (
    <>
      <div className="max-w-[1170px] mx-auto">
        <div className="flex gap-x-4 items-center pb-[13px]">
          <div className="bg-[#DB4444] w-5 h-10 rounded-md"></div>
          <p className="text-base font-pops font-bold text-[#DB4444]">
            Featured
          </p>
        </div>
        <div className="flex gap-x-[87px] items-center pb-10">
          <h2 className="text-black font-semibold font-inter text-4xl">
            New Arrival
          </h2>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div className="w-[570px] h-[600px] bg-black rounded-md px-[30px] pt-[90px] relative">
              <img src={play} alt="" />
              <div className="absolute bottom-[32px] left-[32px]">
                <h2 className="text-2xl font-semibold font-inter text-white">
                  PlayStation 5
                </h2>
                <p className="text-[14px] font-pops text-white w-[242px] py-[16px]">
                  Black and White version of the PS5 coming out on sale.
                </p>
                <a
                  className="text-base font-medium font-pops underline text-white"
                  href="#"
                >
                  Shop Now
                </a>
              </div>
            </div>
            <div className="space-y-10">
              <div className="w-[570px] h-[285px] bg-[#0d0d0d] rounded-md relative">
                <img className="ml-auto rounded-md" src={girl} alt="" />
                <div className="absolute bottom-[24px] left-[24px]">
                  <h2 className="text-2xl font-semibold font-inter text-white">
                    Women’s Collections
                  </h2>
                  <p className="text-[14px] font-pops text-white w-[255px] py-[16px]">
                    Featured woman collections that give you another vibe.
                  </p>
                  <a
                    className="text-base font-medium font-pops underline text-white"
                    href="#"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="relative bg-black w-[270px] h-[274px] p-[30px] rounded-md">
                  <img className="relative" src={speaker} alt="" />
                  <div className="bg-[#ffffff5b] h-[196px] w-[196px] rounded-full filter blur-3xl absolute top-[0px] left-[0px] z-0"></div>
                  <div className="absolute bottom-[24px] left-[24px]">
                    <h2 className="text-2xl font-semibold font-inter text-white">
                      Speakers
                    </h2>
                    <p className="text-[14px] font-pops text-white py-[8px]">
                      Amazon wireless speakers
                    </p>
                    <a
                      className="text-base font-medium font-pops underline text-white"
                      href="#"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
                <div className="relative bg-black w-[270px] h-[274px] p-[30px] rounded-md">
                  <img className="relative" src={perfume} alt="" />
                  <div className="bg-[#ffffff5b] h-[196px] w-[196px] rounded-full filter blur-3xl absolute top-[0px] left-[0px] z-0"></div>
                  <div className="absolute bottom-[24px] left-[24px]">
                    <h2 className="text-2xl font-semibold font-inter text-white">
                      Perfume
                    </h2>
                    <p className="text-[14px] font-pops text-white py-[8px]">
                      GUCCI INTENSE OUD EDP
                    </p>
                    <a
                      className="text-base font-medium font-pops underline text-white"
                      href="#"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-[140px] max-w-[1170px] mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <div className="bg-black mx-auto rounded-full text-white border-[10px] border-[#2F2E30] w-[80px] h-[80px] p-[10px]">
              <TbTruckDelivery size={40} />
            </div>
            <p className="text-[20px] text-center font-semibold font-pops pt-[24px] text-black">
              FREE AND FAST DELIVERY
            </p>
            <p className="text-[14px] text-center font-pops pt-[8px] text-black">
              Free delivery for all orders over $140
            </p>
          </div>
          <div>
            <div className="bg-black mx-auto rounded-full text-white border-[10px] border-[#2F2E30] w-[80px] h-[80px] p-[10px]">
              <TbHeadphones size={40} />
            </div>
            <p className="text-[20px] text-center font-semibold font-pops pt-[24px] text-black">
              24/7 CUSTOMER SERVICE
            </p>
            <p className="text-[14px] text-center font-pops pt-[8px] text-black">
              Friendly 24/7 customer support
            </p>
          </div>
          <div>
            <div className="bg-black mx-auto rounded-full text-white border-[10px] border-[#2F2E30] w-[80px] h-[80px] p-[10px]">
              <IoShieldCheckmarkOutline size={40} />
            </div>
            <p className="text-[20px] text-center font-semibold font-pops pt-[24px] text-black">
              MONEY BACK GUARANTEE
            </p>
            <p className="text-[14px] text-center font-pops pt-[8px] text-black">
              We reurn money within 30 days
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature;
