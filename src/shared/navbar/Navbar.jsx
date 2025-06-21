import React from "react";
import { NavLink } from "react-router";
import EasyDeliveryLogo from "../easyDeliveryLogo/EasyDeliveryLogo";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-4 px-4">
        {/* Left: Logo + Dropdown */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <EasyDeliveryLogo />
        </div>

        {/* Center: Nav links for large screens */}
        <div className="hidden lg:block">
          <ul className="menu menu-horizontal px-1 flex gap-4">{links}</ul>
        </div>

        {/* Right: Button */}
        <div>
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
