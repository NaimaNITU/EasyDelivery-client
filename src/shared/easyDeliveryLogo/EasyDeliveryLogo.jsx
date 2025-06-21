import React from "react";
import tinyDeliveryMan from "../../assets/brands/tiny-deliveryman.png";

const EasyDeliveryLogo = () => {
  return (
    <div className="flex items-end gap-2 relative">
      {/* Text: Easy Delivery */}
      <div className="logoFont text-sm font-bold leading-tight">
        Easy
        <br />
        Delivery
      </div>

      {/* Image: align to bottom */}
      <img
        src={tinyDeliveryMan}
        alt="Delivery Man"
        className="w-16 h-16 object-contain absolute  left-4"
      />
    </div>
  );
};

export default EasyDeliveryLogo;
