import React from "react";
import Banner from "../Banner/Banner";
import OurServices from "../OurServices/OurServices";
import BrandSwiper from "../../../components/Swiper/BrandMarquee";
import BrandMarquee from "../../../components/Swiper/BrandMarquee";
import Benefit from "../Benefit/Benefit";
import BeAMerchant from "../BeAMerchant/BeAMerchant";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <OurServices />
      <BrandMarquee />
      <Benefit />
      <BeAMerchant />
    </>
  );
};

export default Home;
