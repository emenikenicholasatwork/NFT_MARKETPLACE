"use client";
import { useGlobal } from "@/context/GlobalContext";
import React, { useState } from "react";
import { MdOutlineSwapHorizontalCircle, MdSwapHorizontalCircle, MdWallet } from "react-icons/md";
import styles from "./userHeader.module.css";
import { IoNotificationsSharp, IoSettings, IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import { IoIosCreate } from "react-icons/io";
import { AiFillDollarCircle, AiOutlineDollar } from "react-icons/ai";
import { FaListUl } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import Swap from "./user_header_quick_component/swap/Swap";
import Crypto from "./user_header_quick_component/crypto/Crypto";
import Transactions from "./user_header_quick_component/transactions/Transactions";
import Setting from "./user_header_quick_component/settings/Setting";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserHeader = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("crypto");

  const {
    setNightMode,
    isNightMode,
    isLoggedIn,
    cartItems,
    changeSearchState,
    setLogin,
    isShowLogin,
    isUserHeaderWalletInfo,
    setUserHeaderWalletInfo,
    setShowCart,
    activate_account
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
      className={` h-20 p-5 left-0 right-0 fixed z-[2] items-center justify-between flex ${isNightMode ? "bg-[#252927] text-white" : "bg-[#e0f7fa] text-black"}`}
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
          onClick={() => setUserHeaderWalletInfo()}
        >
          <MdWallet className={styles.wallet_icon} />
          <p className="text-lg">0 ETH</p>
        </div>
          {isUserHeaderWalletInfo && (
            <div
              className={`${styles.wallet_info_div} ${
                isNightMode ? "bg-black" : "bg-white"
              } `}
            >
              {activeTab === "crypto" && <Crypto />}
              {activeTab === "swap" && <Swap />}
              {activeTab === "transactions" && <Transactions />}
              {activeTab === "settings" && <Setting />}
              <div
                className={`flex flex-col ${
                  isNightMode ? "dark:bg-gray-900" : "bg-gray-200"
                }`}
              >
                <hr className="bg-white w-full border-white" />
                <div className="flex flex-row justify-between p-3">
                  <div
                    onClick={() => setActiveTab("crypto")}
                    id="bottom_nav"
                    className={`flex active flex-col items-center cursor-pointer ${
                      isNightMode
                        ? `text-gray-400 ${
                            activeTab === "crypto" && "text-white"
                          }`
                        : `text-[#66696b] ${
                            activeTab === "crypto" && "text-black"
                          }`
                    }`}
                  >
                    {activeTab === "crypto" ? <AiFillDollarCircle/> : <AiOutlineDollar />}
                    <p>Crypto</p>
                  </div>
                  <div
                    onClick={() => setActiveTab("swap")}
                    id="bottom_nav"
                    className={`flex flex-col items-center cursor-pointer ${
                      isNightMode
                        ? `text-gray-400 ${
                            activeTab === "swap" && "text-white"
                          }`
                        : `text-[#66696b] ${
                            activeTab === "swap" && "text-black"
                          }`
                    }`}
                  >
                    {activeTab === "swap" ? <MdSwapHorizontalCircle/> : <MdOutlineSwapHorizontalCircle />}
                    <p>Swap</p>
                  </div>
                  <div
                    onClick={() => setActiveTab("transactions")}
                    id="bottom_nav"
                    className={`flex flex-col items-center cursor-pointer ${
                      isNightMode
                        ? `text-gray-400 ${
                            activeTab === "transactions" && "text-white"
                          }`
                        : `text-[#66696b] ${
                            activeTab === "transactions" && "text-black"
                          }`
                    }`}
                  >
                    {activeTab === "transactions" ? <FaListAlt/> : <FaListUl/>}
                    <p>Transactions</p>
                  </div>
                  <div
                    onClick={() => setActiveTab("settings")}
                    id="bottom_nav"
                    className={`flex flex-col items-center cursor-pointer ${
                      isNightMode
                        ? `text-gray-400 ${
                            activeTab === "settings" && "text-white"
                          }`
                        : `text-[#66696b] ${
                            activeTab === "settings" && "text-black"
                          }`
                    }`}
                  >
                    {activeTab === "settings" ? <IoSettings/> : <IoSettingsOutline />}
                    <p>Settings</p>
                  </div>
                </div>
              </div>
            </div>
          )}
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
              <Link href={"/user/profile"}>
                <li>
                  <i className="bi bi-person"></i>
                  <p>Profile</p>
                </li>
              </Link>
              <Link href={"/user/watchlist"}>
                <li>
                  <i className="bi bi-eye"></i>
                  <p>WatchList</p>
                </li>
              </Link>
              <Link href={"/user/notification"}>
                <li>
                  <IoNotificationsSharp />
                  <p>Notification</p>
                </li>
              </Link>
              <Link href={"/user/create"}>
                <li>
                  <IoIosCreate />
                  <p>Create NFT</p>
                </li>
              </Link>
              <hr className="my-2" />
              <Link href={"/user/settings"}>
                <li>
                  <i className="bi bi-gear"></i>
                  <p>Settings</p>
                </li>
              </Link>
              <li>
                <i className="bi bi-moon"></i>
                <p>Night Mode</p>
                <i className={`bi ${
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
              <Link href={"/"} onClick={()=>activate_account(null)}>
                <li>
                  <BiLogOut/>
                  <p>Logout</p>
                </li>
              </Link>
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
