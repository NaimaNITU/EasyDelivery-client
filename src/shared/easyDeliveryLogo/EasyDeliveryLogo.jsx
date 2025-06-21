import React from "react";
import tinyDeliveryMan from "../../assets/brands/tiny-deliveryman.png";

const EasyDeliveryLogo = () => {
  return (
    <div className="flex items-end gap-2 relative">
      {/* Text: Easy Delivery */}
      <div className=" text-sm font-bold leading-tight">
        <span className="text-[16px] ml-3 logoFont">Easy</span>
        <br />
        <span className="text-green-400  font-extrabold text-xl orbitron">
          Delivery
        </span>
      </div>

      {/* Image: align to bottom */}
      <img
        src={tinyDeliveryMan}
        alt="Delivery Man"
        className="w-16 h-16 object-contain absolute  left-4 -top-5"
      />
    </div>
  );
};

export default EasyDeliveryLogo;
