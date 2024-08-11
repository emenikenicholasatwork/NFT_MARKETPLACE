"use client";
import Top from "../../components/Top";
import Dash from "../../components/Dash";
import DashDisplay from "../../components/dashDisplay/DashDisplay";
import UserHeader from "../../components/header/user_header/UserHeader";
import Footer from "../../components/Footer";
import { useGlobal } from "../../context/GlobalContext";
import React from "react";
import Collections from "../../components/collections/Collections";

const page = () => {
  const { isNightMode } = useGlobal();

  return (
    <div className={`min-h-screen ${isNightMode ? "bg-[#252927]  text-white" : "bg-white text-black"} duration-100`}>
      <UserHeader />
      <DashDisplay />
      <Dash />
      <Top />
      <Collections />
      <Footer />
    </div>
  );
};
export default page;
