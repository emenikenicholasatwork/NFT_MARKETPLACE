"use client";
import * as React from "react";
import Top from "../../components/Top";
import Dash from "../../components/Dash";
import UserDashDisplay from "../../components/dashDisplay/UserDashDisplay";
import Collections from "../../components/collections/Collections";
import { useGlobal } from "../../context/GlobalContext";
import UserHeader from "../../components/header/user_header/UserHeader";
import Footer from "../../components/Footer";

const page = () => {
  const { isNightMode } = useGlobal();
  return (
    <main className={`min-h-screen gap-0 ${isNightMode ? "bg-[#252927]  text-white" : "bg-white text-black"} duration-300`}>
      <UserHeader />
      <UserDashDisplay />
      <Dash />
      <Top />
      <Collections />
      <Footer />
    </main>
  );
};
export default page;
