import { useGlobal } from "../../context/GlobalContext";
import React from "react";
import "./header.css";
import Link from "next/link";
import { IoOptions } from "react-icons/io5";

const Header: React.FC = () => {
  const {
    setNightMode,
    isNightMode,
    login
  } = useGlobal();

  return (
    <header className={` h-20 p-5 w-full fixed z-[2] top-0 items-center justify-between flex ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"} duration-100`}>
      <Link href={"/"}>
        <div className="logo_div">
          <i className="bi bi-currency-bitcoin"></i>
          <p>Crypto~Art</p>
        </div>
      </Link>
      <div className="login_menu_div">
        <div className="login_div" onClick={() => login()}>
          <i className="bi bi-wallet text-lg"></i>
          <p className="text-lg">Login</p>
        </div>
        <div className="user_dropdown_div">
          <IoOptions className="text-2xl" />
          <div className={`user_info_dropdown ${isNightMode ? "bg-[#1c1f1d]" : "bg-white"} `}>
            <ul>
              <li onClick={() => setNightMode()}>
                <i className="bi bi-moon"></i>
                <p>Night Mode</p>
                <i className={`bi ${isNightMode ? "bi-toggle-on" : "bi-toggle-off"} font-bold text-3xl text-blue-500 ms-3 hover:text-blue-700`}></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
