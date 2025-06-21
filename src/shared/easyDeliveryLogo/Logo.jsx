import React from "react";
import logo from "../../assets/brands/mainLogo.png";
const Logo = () => {
  return (
    <>
      <div className="flex items-center gap-3 bg-blue-100 p-3  rounded-lg">
        <img className="w-24 h-auto" src={logo} alt="" />
      </div>
    </>
  );
};

export default Logo;
