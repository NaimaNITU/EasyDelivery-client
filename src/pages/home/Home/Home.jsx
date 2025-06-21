import React from "react";
import Banner from "../Banner/Banner";
import OurServices from "../OurServices/OurServices";
import BrandSwiper from "../../../components/Swiper/BrandMarquee";
import BrandMarquee from "../../../components/Swiper/BrandMarquee";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <OurServices></OurServices>
      <BrandMarquee />
    </>
  );
};

export default Home;
