import React from "react";
import Countdown from "react-countdown";
import cloth from "../../assets/cloth.png";
import table from "../../assets/table.png";
import cooler from "../../assets/coller.png";
import bag from "../../assets/bag.png";
import Product from "../Product/Product";
import jbl from "../../assets/jbl.png";

const Month = () => {
  const offerEndTime = "2024-12-31T23:59:59";
  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <div className="mt-[70px] pb-[140px] max-w-[1170px] mx-auto">
      <div className="flex gap-x-4 items-center pb-[13px]">
        <div className="bg-[#DB4444] w-5 h-10 rounded-md"></div>
        <p className="text-base font-pops font-bold text-[#DB4444]">
          This Month
        </p>
      </div>
      <div className="flex items-center pb-10">
        <h2 className="text-black font-semibold font-inter text-4xl">
          Best Selling Products
        </h2>
        <div className="flex items-center gap-x-2 ml-auto">
          <button className="w-[160px] font-pops h-[55px] bg-[#DB4444] text-white rounded-sm text-base font-medium">
            View All
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <Product
          name={"HAVIT HV-G92 Gamepad"}
          img={cloth}
          offer={"-40%"}
          price={"$160"}
          regular={"$120"}
          review={"(88)"}
        />
        <Product
          name={"AK-900 Wired Keyboard"}
          img={bag}
          offer={"-35%"}
          price={"$1160"}
          regular={"$960"}
          review={"(75)"}
        />
        <Product
          name={"IPS LCD Gaming Monitor"}
          img={cooler}
          offer={"-30%"}
          price={"$400"}
          regular={"$370"}
          review={"(99)"}
        />
        <Product
          name={"S-Series Comfort Chair "}
          img={table}
          offer={"-25%"}
          price={"$400"}
          regular={"$370"}
          review={"(99)"}
        />
      </div>
      <div className="w-full flex justify-between items-center bg-black h-[500px] pl-[56px] pt-[37px] pb-[43px] pr-[44px] mt-[140px]">
        <div>
          <p className="text-[#00FF66] text-base font-pops font-bold ">
            Categories
          </p>
          <h1 className="text-5xl font-semibold font-inter text-white w-[440px] py-[32px]">
            Enhance Your Music Experience
          </h1>
          <Countdown
            date={new Date(offerEndTime)}
            renderer={({ days, hours, minutes, seconds }) => (
              <div className="flex gap-x-[17px] items-center">
                <div className="w-[62px] h-[62px] bg-white rounded-full pt-3">
                  <h3 className="text-[16px] text-center font-pops text-black font-semibold">
                    {formatNumber(days)}
                  </h3>
                  <p className="font-pops text-center text-[11px] text-black">
                    Days
                  </p>
                </div>
                <div className="w-[62px] h-[62px] bg-white rounded-full pt-3">
                  <h3 className="text-[16px] text-center font-pops text-black font-semibold">
                    {formatNumber(hours)}
                  </h3>
                  <p className="font-pops text-center text-[11px] text-black">
                    Hours
                  </p>
                </div>
                <div className="w-[62px] h-[62px] bg-white rounded-full pt-3">
                  <h3 className="text-[16px] text-center font-pops text-black font-semibold">
                    {formatNumber(minutes)}
                  </h3>
                  <p className="font-pops text-center text-[11px] text-black">
                    Minutes
                  </p>
                </div>
                <div className="w-[62px] h-[62px] bg-white rounded-full pt-3">
                  <h3 className="text-[16px] text-center font-pops text-black font-semibold">
                    {formatNumber(seconds)}
                  </h3>
                  <p className="font-pops text-center text-[11px] text-black">
                    Seconds
                  </p>
                </div>
              </div>
            )}
          />
          <button className="w-[170px] h-[55px] bg-[#00FF66] text-white font-medium font-pops text-base rounded-md mt-10">Buy Now!</button>
        </div>
        <div className="relative">
          <div className="bg-[#ffffff5b] h-[400px] w-[500px] rounded-full filter blur-3xl absolute top-[-10px] left-[50px] z-0"></div>
          <div className="relative z-10">
            <img src={jbl} alt="Example Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Month;
