import React from "react";
import { IoMdSend } from "react-icons/io";
import qr from "../../assets/qr.png";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="bg-black">
      <div className="max-w-[1170px] mx-auto py-[70px]">
        <div className="flex justify-between">
          <div>
            <h3 className="font-inter font-bold text-white text-2xl">
              Exclusive
            </h3>
            <p className="cursor-pointer font-pops font-medium text-white text-[20] py-[24px]">
              Subscribe
            </p>
            <p className="font-pops text-white text-base pb-[16px]">
              Get 10% off your first order
            </p>
            <div className="relative">
              <input
                className="text-[#f5f5f580] outline-none border-[3px] pl-[16px] border-[#f5f5f580] bg-transparent w-[217px] h-[48px]"
                placeholder="Enter your email"
                type="text"
              />
              <IoMdSend
                className="text-white absolute top-[10px] right-2 cursor-pointer"
                size={24}
              />
            </div>
          </div>
          <div>
            <h3 className="font-inter font-bold text-white text-2xl pb-[24px]">
              Support
            </h3>
            <p className="font-pops text-white text-base pb-[16px] w-[175px]">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <p className="font-pops text-white text-base pb-[16px] my-4">
              exclusive@gmail.com
            </p>
            <p className="font-pops text-white text-base pb-[16px]">
              +88015-88888-9999
            </p>
          </div>
          <div>
            <h3 className="font-inter font-bold text-white text-2xl pb-[24px]">
              Account
            </h3>
            <p className="cursor-pointer font-pops text-white text-base pb-[16px] w-[175px]">
              My Account
            </p>
            <p className="cursor-pointer font-pops text-white text-base pb-[16px] my-4">
              Login / Register
            </p>
            <p className="cursor-pointer font-pops text-white text-base pb-[16px] mb-4">
              Cart
            </p>
            <p className="cursor-pointer font-pops text-white text-base pb-[16px] mb-4">
              Wishlist
            </p>
            <p className="cursor-pointer font-pops text-white text-base pb-[16px]">Shop</p>
          </div>
          <div>
            <h3 className="font-inter font-bold text-white text-2xl pb-[24px]">
              Quick Link
            </h3>
            <p className="cursor-pointer font-pops text-white text-base pb-[16px] w-[175px]">
              Privacy Policy
            </p>
            <p className="cursor-pointer font-pops text-white text-base pb-[16px] my-4">
              Terms Of Use
            </p>
            <p className="cursor-pointer font-pops text-white text-base pb-[16px] mb-4">FAQ</p>
            <p className="cursor-pointer font-pops text-white text-base pb-[16px] mb-4">
              Contact
            </p>
          </div>
          <div>
            <h3 className="font-inter font-bold text-white text-2xl pb-[24px]">
              Download App
            </h3>
            <p className="font-pops text-[#fafafaab] font-medium text-xs mb-4">
              Save $3 with App New User Only
            </p>
            <div className="flex items-center justify-between">
              <img src={qr} alt="" />
              <div className="space-y-3">
                <img className="cursor-pointer" src={google} alt="" />
                <img className="cursor-pointer" src={apple} alt="" />
              </div>
            </div>
            <div className="flex items-center justify-between text-white mt-[24px]">
              <FaFacebookF className="cursor-pointer" size={24} />
              <CiTwitter className="cursor-pointer" size={28} />
              <FaInstagram className="cursor-pointer" size={24} />
              <FaLinkedinIn className="cursor-pointer" size={24} />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-[#ffffff5d]">
        <p className="font-pops text-base text-[#ffffff5b] text-center pt-4 pb-6" >©  Copyright Rimel 2022. All right reserved</p>
      </div>
    </div>
  );
};

export default Footer;
