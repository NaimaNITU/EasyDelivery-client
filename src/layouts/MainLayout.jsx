import React from "react";
import { Outlet } from "react-router";
import Footer from "../shared/footer/Footer";
import Navbar from "../shared/navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <nav className="w-full sticky top-0 bg-white z-50">
        <Navbar />
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
