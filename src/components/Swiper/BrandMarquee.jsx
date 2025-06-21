import React from "react";

// Import brand images (option B example)
import brand1 from "../../assets/brands/amazon.png";
import brand2 from "../../assets/brands/casio.png";
import brand3 from "../../assets/brands/moonstar.png";
import brand4 from "../../assets/brands/start.png";
import brand5 from "../../assets/brands/randstad.png";
import brand6 from "../../assets/brands/start-people 1.png";
import Marquee from "react-fast-marquee";

const brandImages = [brand1, brand2, brand3, brand4, brand5, brand6];

const BrandMarquee = () => {
  return (
    <div className="py-10 bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6 text-[#003B3B]">
        Trusted by Leading Brands
      </h2>
      <Marquee speed={50} gradient={false}>
        {brandImages.map((img, idx) => (
          <div
            key={idx}
            className="mx-8 gap-30 flex justify-center items-center"
          >
            <img
              src={img}
              alt={`Brand ${idx + 1}`}
              className="h-6 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandMarquee;
