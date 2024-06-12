"use client";
import { useGlobal } from "@/context/GlobalContext";
import React, { useState } from "react";
import { MdWallet } from "react-icons/md";
import styles from "./userHeader.module.css";
import { IoChevronDownOutline, IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import { IoMdSwap } from "react-icons/io";
import { AiOutlineDollar } from "react-icons/ai";
import { FaInfinity, FaTableList } from "react-icons/fa6";

const UserHeader = () => {
  const [open_wallet_details, set_open_wallet_details] = useState(false);
  const change_open_wallet_details_state = () => {
    set_open_wallet_details(!open_wallet_details);
  };

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
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const clearInput = () => {
    setInputValue("");
  };

  return (
    <header
      className={`${isNightMode ? "night_mode" : ""}`}
      id="default_header"
    >
      <div className="logo_div">
        <i className="bi bi-currency-bitcoin"></i>
        <p>Crypto~Art</p>
      </div>
      <div className="search_div">
        <i className="bi bi-search"></i>
        <input
          onChange={handleInputChange}
          value={inputValue}
          type="text"
          placeholder="Search"
        />
        {inputValue ? (
          <i className="search_input_icon_1 bi bi-x" onClick={clearInput}></i>
        ) : (
          <i className="search_input_icon_2">/</i>
        )}
      </div>
      <div className="login_menu_div">
        <div
          className={styles.wallet_value_div}
          onClick={() => set_open_wallet_details(true)}
        >
          <MdWallet className={styles.wallet_icon} />
          <p className="text-lg">0 ETH</p>
          {open_wallet_details && (
            <div
              className={`${styles.wallet_info_div} ${
                isNightMode ? "bg-black" : "bg-white"
              } `}
            >
              <div className="p-3 gap-5 flex flex-col">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-1 items-center hover:bg-gray-400 p-2 rounded-md duration-100 hover:text-white">
                    <img
                      src="/icons/metamask.svg"
                      className=""
                      height={20}
                      width={30}
                      alt="MetaMask Icon"
                    />
                    <p>0x43be...15ed</p>
                  </div>
                  <div className="flex flex-row items-center gap-2 text-lg hover:bg-gray-500 rounded-md p-2 hover:text-white duration-200">
                    <FaInfinity />
                    <IoChevronDownOutline />
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <p className="text-3xl">$0.00 USD</p>
                    <p className="">wallet balance</p>
                  </div>
                  <div className="bg-neutral-400 w-12 h-12 rounded-md hover:bg-neutral-500 duration-300 ease flex items-center justify-center">
                    <p className="text-white text-5xl font-thin">+</p>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  isNightMode ? "bg[#192f37]" : "bg-gray-200"
                } h-72 pt-5`}
              >
                <div className="flex flex-col justify-center items-center gap-2">
                  <Image
                    className="w-24 h-24"
                    src={"/icons/wallet.png"}
                    height={500}
                    width={500}
                  />
                  <p className="w-36">Fund your wallet to purchase NFTs</p>
                  <button className="bg-blue-500 text-white p-3 rounded-md">
                    Add funds with card
                  </button>
                </div>
              </div>
              <div
                className={`flex flex-col ${
                  isNightMode ? "dark:bg-gray-900" : "bg-gray-200"
                }`}
              >
                <hr className="bg-white w-full border-white" />
                <div className="flex flex-row justify-between p-3">
                  <div
                    id="bottom_nav"
                    className={`flex active flex-col items-center ${
                      isNightMode ? "text-gray-400" : "text-[#66696b]"
                    }`}
                  >
                    <AiOutlineDollar />
                    <p>Crypto</p>
                  </div>
                  <div
                    id="bottom_nav"
                    className={`flex flex-col items-center ${
                      isNightMode ? "text-gray-400" : "text-[#66696b]"
                    }`}
                  >
                    <IoMdSwap />
                    <p>Swap</p>
                  </div>
                  <div
                    id="bottom_nav"
                    className={`flex flex-col items-center ${
                      isNightMode
                        ? "text-gray-400 night_active"
                        : "text-[#66696b] day_active"
                    }`}
                  >
                    <FaTableList />
                    <p>Transactions</p>
                  </div>
                  <div
                    id="bottom_nav"
                    className={`flex flex-col items-center ${
                      isNightMode ? "text-gray-400" : "text-[#66696b]"
                    }`}
                  >
                    <IoSettingsOutline />
                    <p>Settings</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="user_dropdown_div">
          <Image
            className={styles.user_image}
            src={"/images/bg1.jpg"}
            width={500}
            height={500}
          />
          <div
            className={`user_info_dropdown ${
              isNightMode ? "bg-black" : "bg-white"
            } `}
          >
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
              <li>
                <i className="bi bi-gear"></i>
                <p>Settings</p>
              </li>
              <li>
                <i className="bi bi-moon"></i>
                <p>Night Mode</p>
                <i
                  className={`bi ${
                    isNightMode ? "bi-toggle-on" : "bi-toggle-off"
                  } font-bold text-3xl text-blue-500 ms-3 hover:text-blue-700`}
                  onClick={() => setNightMode()}
                ></i>
              </li>
              <hr className="my-2" />
              <li>
                <i className="bi bi-journals"></i>
                <p>Learn</p>
              </li>
              <li>
                <i className="bi bi-question-circle"></i>
                <p>Help center</p>
              </li>
              <hr className="my-2" />
              <li>
                <BiLogOut className="" />
                <p>Logout</p>
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
        <div
          className="menu style_share"
          onClick={() => setIsDropdownOpen(true)}
        >
          <i className="bi bi-list"></i>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
