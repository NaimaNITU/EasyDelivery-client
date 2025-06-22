import React from "react";
import merchantImg from "../../../assets/brands/location-merchant.png";
import bgImg from "../../../assets/brands/be-a-merchant-bg.png";

const BeAMerchant = () => {
  return (
    <>
      <div
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        style={{ backgroundImage: `url(${bgImg})` }}
        className="bg-[#03373D] bg-no-repeat p-16 rounded-3xl "
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={merchantImg} className="max-w-sm " />
          <div>
            <h1 className="text-3xl font-bold text-white">
              Box Office News!Merchant and Customer Satisfaction is Our First
              Priority
            </h1>
            <p className="py-6 text-gray-400">
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. Pathao courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>
            <button className="btn btn-primary text-black rounded-full">
              Become a Merchant
            </button>
            <button className="btn border bg-[#03373D] border-primary text-black ms-3 rounded-full text-primary">
              Earn with Easy Delivery Courier
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeAMerchant;
