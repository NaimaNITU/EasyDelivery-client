import React from "react";
import logo from "../../assets/brands/mainLogo.png";
import { Link } from "react-router";
const Logo = () => {
  return (
    <>
      <Link to="/">
        <div className="   rounded-lg">
          <img className="w-24 h-auto" src={logo} alt="" />
        </div>
      </Link>
    </>
  );
};

export default Logo;
