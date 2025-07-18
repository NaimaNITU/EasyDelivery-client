import React from "react";
import { NavLink } from "react-router";
import EasyDeliveryLogo from "../easyDeliveryLogo/EasyDeliveryLogo";
import Logo from "../easyDeliveryLogo/Logo";
import useAuth from "./../../hooks/useAuth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel">Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
    </>
  );

  const handleSignOut = () => {
    logoutUser()
      .then(() => {})
      .catch((error) => {});
  };
  return (
    <div className="bg-base-100 shadow-sm">
      <div className=" flex justify-between items-center py-4 px-4">
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
          {/* <EasyDeliveryLogo /> */}
          <Logo />
        </div>

        {/* Center: Nav links for large screens */}
        <div className="hidden lg:block">
          <ul className="menu menu-horizontal px-1 flex gap-4">{links}</ul>
        </div>

        {/* Right: Button */}
        <div>
          {user ? (
            <button
              onClick={handleSignOut}
              className="btn btn-primary text-black"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/auth/login">
              <button className="btn btn-primary text-black">Login</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
