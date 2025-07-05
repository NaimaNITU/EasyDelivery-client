import React from "react";
import parcelImage from "../../../assets/brands/percel-receive.png";
import deliverymanImage from "../../../assets/brands/percle-deliveryman.png";

const Benefit = () => {
  const features = [
    {
      title: "Live Parcel Tracking",
      desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      img: parcelImage,
    },
    {
      title: "100% Safe Delivery",
      desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      img: deliverymanImage,
    },
    {
      title: "24/7 Call Center Support",
      desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      img: deliverymanImage,
    },
  ];

  return (
    <section className="flex flex-col gap-12 p-6 md:p-12 ">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center gap-8  shadow-md rounded-3xl p-6 md:p-12"
        >
          {/* Image */}
          <div className="w-full md:w-1/4">
            <img
              src={feature.img}
              alt={feature.title}
              className="w-36 h-36 rounded-xl "
            />
          </div>

          {/* Dashed vertical line */}
          <div className="hidden md:block h-40 w-px border-r-2 border-dashed border-gray-300"></div>

          {/* Text content */}
          <div className="w-full md:w-3/4">
            <h3 className="text-xl md:text-2xl font-bold ">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Benefit;
