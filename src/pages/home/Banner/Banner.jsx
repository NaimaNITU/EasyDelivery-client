import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
const Banner = () => {
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        className="mt-4"
      >
        <div>
          <img src={bannerImg1} />
          <p className="legend">Arrives on time</p>
        </div>
        <div>
          <img src={bannerImg2} />
          <p className="legend">Fastest delivery & easy pickup</p>
        </div>
        <div>
          <img src={bannerImg3} />
          <p className="legend">Delivery in 30 minutes</p>
        </div>
      </Carousel>
    </>
  );
};

export default Banner;
