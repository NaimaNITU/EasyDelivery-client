import React from "react";
import {
  FaShippingFast,
  FaGlobeAsia,
  FaWarehouse,
  FaMoneyBillWave,
  FaHandshake,
  FaUndoAlt,
} from "react-icons/fa";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

// Icon mapping by title
const getIcon = (title) => {
  switch (title) {
    case "Express & Standard Delivery":
      return <FaShippingFast size={30} className="text-red-400" />;
    case "Nationwide Delivery":
      return <FaGlobeAsia size={30} className="text-green-500" />;
    case "Fulfillment Solution":
      return <FaWarehouse size={30} className="text-yellow-500" />;
    case "Cash on Home Delivery":
      return <FaMoneyBillWave size={30} className="text-blue-500" />;
    case "Corporate Service / Contract In Logistics":
      return <FaHandshake size={30} className="text-purple-500" />;
    case "Parcel Return":
      return <FaUndoAlt size={30} className="text-orange-500" />;
    default:
      return <FaShippingFast size={30} className="text-gray-400" />;
  }
};

const OurServices = () => {
  return (
    <div className="bg-[#003B3B] text-white mt-4 py-26 px-4 md:px-10 rounded-3xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Our Services</h2>
        <p className="text-lg mt-4 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="rounded-2xl p-8 bg-white text-[#003B3B] shadow-md transition-all duration-300 hover:bg-lime-200 hover:scale-[1.02]"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 p-4 rounded-full">
                {getIcon(service.title)}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">
              {service.title}
            </h3>
            <p className="text-center text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
