import React from "react";
import { Outlet } from "react-router";
import AuthImg from "../assets/brands/authImage.png";
import Logo from "../shared/easyDeliveryLogo/Logo";

const AuthLayout = () => {
  return (
    <>
      <div className="  p-16">
        <Logo />
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1 bg-[#FAFDF0]">
            <img src={AuthImg} className="max-w-sm rounded-lg " />
          </div>
          <div className="flex-1 ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
