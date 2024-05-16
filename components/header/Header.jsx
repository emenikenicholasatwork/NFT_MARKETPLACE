import { useGlobal } from "@/context/GlobalContext";
import React, { useState } from "react";
import styles from "./header.css";

const Header = () => {
  const {
    setNightMode,
    isNightMode,
    isLoggedIn,
    cartLength,
    changeSearchState,
    setLogin,
    isShowLogin,
    setShowCart,
  } = useGlobal();
  const [inputValue, setInputValue] = useState("");
  let timeout;
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
  };

  return (
    <header className={`${isNightMode ? 'night_mode':''}`}>
      <div className="logo_div">
        <i className="bi bi-currency-bitcoin"></i>
        <p>Crypto~Art</p>
      </div>
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
          <div className={`user_info_dropdown ${
              isNightMode ? "bg-black" : "bg-white"
            } `}>
            <ul>
              <li onClick={() => (isLoggedIn ? "" : setLogin())}>
                <i className="bi bi-person"></i>
                <p>Profile</p>
              </li>
              <li onClick={() => (isLoggedIn ? "" : setLogin())}>
                <i className="bi bi-eye"></i>
                <p>WatchList</p>
              </li>
              <hr className="my-2" />
              <li >
                <i className="bi bi-gear"></i>
                <p>Settings</p>
              </li>
              <li>
                <i className="bi bi-moon"></i>
                <p>Night Mode</p>
                <i className={`bi ${
                    isNightMode ? "bi-toggle-on" : "bi-toggle-off"
                  } font-bold text-3xl text-blue-500 ms-3 hover:text-blue-700`}
                  onClick={() => setNightMode()}></i>
              </li>
              <hr className="my-2" />
              <li >
                <i className="bi bi-journals"></i>
                <p>Learn</p>
              </li>
              <li>
                <i className="bi bi-question-circle"></i>
                <p>Help center</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="shopping_cart_div style_share" onClick={setShowCart}>
          <p>{cartLength}</p>
          <i className="bi bi-cart3"></i>
        </div>
        <div className="search style_share" onClick={changeSearchState}>
          <i className="bi bi-search"></i>
        </div>
        <div className="menu style_share" onClick={() => setIsDropdownOpen(true)}>
          <i className="bi bi-list"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
