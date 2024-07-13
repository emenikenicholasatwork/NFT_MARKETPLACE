import { useGlobal } from "../../context/GlobalContext";
import React, { useState } from "react";
import "./header.css";
import Link from "next/link";

const Header = () => {
  const {
    setNightMode,
    isNightMode,
    isLoggedIn,
    changeSearchState,
    cartItems,
    setLogin,
    setShowCart,
  } = useGlobal();
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
  };

  return (
    <header className={` h-20 p-5 left-0 right-0 fixed z-[2] items-center justify-between flex ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"} duration-300`}>
      <Link href={"/"}>
        <div className="logo_div">
          <i className="bi bi-currency-bitcoin"></i>
          <p>Crypto~Art</p>
        </div>
      </Link>
      <div className="search_div">
        <i className="bi bi-search"></i>
        <input onChange={handleInputChange} value={inputValue} type="text" placeholder="Search"/>
        {inputValue ? (
          <i className="search_input_icon_1 bi bi-x" onClick={clearInput}></i>
        ) : (
          <i className="search_input_icon_2">/</i>
        )}
      </div>
      <div className="login_menu_div">
        <div className="login_div" onClick={setLogin}>
          <i className="bi bi-wallet text-lg"></i>
          <p className="text-lg">Login</p>
        </div>
        <div className="user_dropdown_div">
          <i className="bi bi-person-circle"></i>
          <div className={`user_info_dropdown ${isNightMode ? "bg-[#1c1f1d]" : "bg-white"} `}>
            <ul>
              <li onClick={() => (setLogin())}>
                <i className="bi bi-gear"></i>
                <p>Settings</p>
              </li>
              <li onClick={()=> setNightMode()}>
                <i className="bi bi-moon"></i>
                <p>Night Mode</p>
                <i className={`bi ${isNightMode ? "bi-toggle-on" : "bi-toggle-off"} font-bold text-3xl text-blue-500 ms-3 hover:text-blue-700`}></i>
              </li>
            </ul>
          </div>
        </div>
        <div className="shopping_cart_div style_share" onClick={setShowCart}>
          <p>{cartItems.length}</p>
          <i className="bi bi-cart3"></i>
        </div>
        <div className="search style_share" onClick={changeSearchState}>
          <i className="bi bi-search"></i>
        </div>
        <div className="menu style_share" >
          <i className="bi bi-list"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
