import React from "react";
import Offer from "../../Components/Offer/Offer";
import Header from "../../Components/Header/Header";
import Banner from "../../Components/Banner/Banner";
import Today from "../../Components/Today/Today";
import Categories from "../../Components/Categories/Categories";
import Month from "../../Components/Month/Month";
import OurProduct from "../../Components/ourProduct/ourProduct";
import Feature from "../../Components/Feature/Feature";
import Footer from "../../Components/Footer/Footer";
import { FaArrowUp } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <Offer />
      <Header />
      <Banner />
      <Today />
      <Categories />
      <Month />
      <OurProduct />
      <Feature />
      <Footer />
      <div className="bg-[#E03C3C] text-[#ffffff5b] w-12 h-12 rounded-full p-2 fixed bottom-10 right-10 cursor-pointer">
        <FaArrowUp size={30} />
      </div>
    </>
  );
};

export default Home;
