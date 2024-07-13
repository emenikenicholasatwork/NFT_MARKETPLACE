"use client";
import { useGlobal } from "../../../context/GlobalContext";
import React, { useState } from "react";
import { MdOutlineSwapHorizontalCircle, MdSwapHorizontalCircle, MdWallet } from "react-icons/md";
import { IoNotifications, IoNotificationsSharp, IoSettings, IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import { IoIosCreate } from "react-icons/io";
import { AiFillDollarCircle, AiOutlineDollar } from "react-icons/ai";
import { FaListUl } from "react-icons/fa6";
import { FaListAlt, FaRegUserCircle } from "react-icons/fa";
import Swap from "../../../components/acc_comp/head_comp/swap/Swap";
import Crypto from "../../../components/acc_comp/head_comp/crypto/Crypto";
import Transactions from "../../../components/acc_comp/head_comp/transactions/Transactions";
import Setting from "../../../components/acc_comp/head_comp/settings/Setting";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { GiCheckedShield } from "react-icons/gi";
import Profile from "../../../components/acc_comp/setting_comp/Profile";
import Notification from "../../../components/acc_comp/setting_comp/Notification";

const UserHeader: React.FC = () => {
  const [activeTab, setActiveTab] = useState("crypto");
  const [activeNav, setActiveNav] = useState("profile");

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
    <main className={`${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"}`}>
      <header className={` h-20 p-5 left-0 right-0 duration-300 fixed z-[2] items-center justify-between flex ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"} `}>
        <div className="flex flex-row items-center gap-1">
          <i className="bi bi-currency-bitcoin text-lg bg-green-700 p-2 rounded-md"></i>
          <p className="text-2xl md:block font-bold font-serif hidden">Crypto~Art</p>
        </div>
        <div className="items-center lg:flex hidden focus:border-2 focus:border-white hover:bg-[#9e8c8c75] justify-center flex-row p-2 w-96 overflow-hidden rounded-md bg-[#9e8c8c25] duration-200">
          <i className="bi bi-search"></i>
          <input className=" outline-none p-2 bg-transparent w-80" onChange={handleInputChange} value={inputValue} type="text" placeholder="Search"/>
          {inputValue ? ( <i className="rounded-md text-lg px-2 cursor-pointer bg-[#cfc3c322] shadow-lg bi bi-x" onClick={clearInput}></i> ) : ( <i className="rounded-md bg-[##cfc3c322] text-lg px-1 shadow-lg">/</i> )}
        </div>
        <div className="relative flex flex-row items-center gap-2">
          <div className="flex flex-row items-center content-center p-2 px-3 justify-items-center gap-1 bg-[#9e8c8c25] hover:bg-[#9e8c8c75] duration-200 rounded-md font-bold cursor-pointer" onClick={() => setUserHeaderWalletInfo()}>
            <MdWallet className="text-2xl" />
            <p className="text-lg">0 ETH</p>
          </div>
            {isUserHeaderWalletInfo && (
              <div className={` absolute top-[60px] right-[50px] mt-2 w-[400px] rounded shadow-lg ${isNightMode ? "bg-[#1c1f1d]" : "bg-white"} `}>
                {activeTab === "crypto" && <Crypto />}
                {activeTab === "swap" && <Swap />}
                {activeTab === "transactions" && <Transactions />}
                {activeTab === "settings" && <Setting />}
                <div className={`flex flex-col ${isNightMode ? "dark:bg-gray-900" : "bg-gray-200"}`}>
                  <hr className="bg-white w-full border-white" />
                  <div className="flex flex-row justify-between p-3">
                    <div onClick={() => setActiveTab("crypto")} className={`flex active flex-col items-center cursor-pointer ${isNightMode? `text-gray-400 ${activeTab === "crypto" && "text-white"}`: `text-[#66696b] ${activeTab === "crypto" && "text-black"}`}`}>
                      {activeTab === "crypto" ? <AiFillDollarCircle/> : <AiOutlineDollar />}
                      <p>Crypto</p>
                    </div>
                    <div onClick={() => setActiveTab("swap")} className={`flex flex-col items-center cursor-pointer ${isNightMode ? `text-gray-400 ${activeTab === "swap" && "text-white"}`: `text-[#66696b] ${activeTab === "swap" && "text-black"}`}`}>
                      {activeTab === "swap" ? <MdSwapHorizontalCircle/> : <MdOutlineSwapHorizontalCircle />}
                      <p>Swap</p>
                    </div>
                    <div onClick={() => setActiveTab("transactions")} className={`flex flex-col items-center cursor-pointer ${isNightMode ? `text-gray-400 ${activeTab === "transactions" && "text-white"}` : `text-[#66696b] ${activeTab === "transactions" && "text-black"}`}`}>
                      {activeTab === "transactions" ? <FaListAlt/> : <FaListUl/>}
                      <p>Transactions</p>
                    </div>
                    <div onClick={() => setActiveTab("settings")} className={`flex flex-col items-center cursor-pointer ${isNightMode ? `text-gray-400 ${activeTab === "settings" && "text-white"}`: `text-[#66696b] ${activeTab === "settings" && "text-black"}`}`}>
                      {activeTab === "settings" ? <IoSettings/> : <IoSettingsOutline />}
                      <p>Settings</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          <div className="bg-[#9e8c8c25] px-3 py-2 hover:bg-[#9e8c8c75] duration-200 cursor-pointer rounded-md relative group">
            <Image alt="user image" className="rounded-[20px] h-[30px] w-[30px]" src={"/images/bg1.jpg"} width={500} height={500}/>
            <div className={`group-hover:visible invisible duration-200 shadow-2xl absolute right-0 top-14 w-[250px] p-3 ${isNightMode ? "bg-[#1c1f1d]" : "bg-white"}`}>
              <ul>
                <Link href={"/account/profile"}>
                  <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                    <i className="bi bi-person"></i>
                    <p>Profile</p>
                  </li>
                </Link>
                <Link href={"/account/watchlist"}>
                  <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                    <i className="bi bi-eye"></i>
                    <p>WatchList</p>
                  </li>
                </Link>
                <Link href={"/account/notification"}>
                  <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                    <IoNotificationsSharp />
                    <p>Notification</p>
                  </li>
                </Link>
                <Link href={"/account/create"}>
                  <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                    <IoIosCreate />
                    <p>Create NFT</p>
                  </li>
                </Link>
                <hr className="my-2" />
                <Link href={"/account/settings"}>
                  <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                    <i className="bi bi-gear"></i>
                    <p>Settings</p>
                  </li>
                </Link>
                <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4" onClick={() => setNightMode()}>
                  <i className="bi bi-moon"></i>
                  <p>Night Mode</p>
                  <i className={`bi ${isNightMode ? "bi-toggle-on" : "bi-toggle-off"} font-bold text-3xl text-blue-500 ms-3 hover:text-blue-700`}></i>
                </li>
                <hr className="my-2" />
                <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                  <i className="bi bi-journals"></i>
                  <p>Learn</p>
                </li>
                <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                  <i className="bi bi-question-circle"></i>
                  <p>Help center</p>
                </li>
                <hr className="my-2" />
                <Link href={"/"} onClick={()=>activate_account(null)}>
                  <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4" onClick={()=> toast.success("successfully logged out")}>
                    <BiLogOut/>
                    <p>Logout</p>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="py-2 flex relative px-3 bg-[#9e8c8c25] hover:bg-[#9e8c8c75] duration-200 cursor-pointer rounded-md" onClick={setShowCart}>
            <p className="absolute bg-blue-600 font-bold p-2 rounded-full items-center flex justify-center text-xs top-0 right-0 m-0 h-1 text-white">{cartItems.length}</p>
            <i className="bi bi-cart3 text-lg font-bold"></i>
          </div>
          <div className="lg:hidden bg-[#9e8c8c25] hover:bg-[#9e8c8c75] duration-200 cursor-pointer rounded-md" onClick={changeSearchState}>
            <i className="bi bi-search"></i>
          </div>
          <div className="lg:hidden bg-[#9e8c8c25] hover:bg-[#9e8c8c75] duration-200 cursor-pointer rounded-md">
            <i className="bi bi-list"></i>
          </div>
        </div>
      </header>
      <section className={`pt-20 px-20 fixed flex flex-row left-0 bottom-0 gap-5 top-0 w-full ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"} duration-300 `}>
        <div className="pt-20">
          <h1 className="font-bold text-2xl">Settings</h1>
          <nav className="pt-10">
            <ul className="w-60">
              <li className={`items-center py-2 text-lg hover:bg-[#3e3b3b] text-gray-400 duration-75 ${activeNav === "profile" && "text-white"} hover:text-white cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4`} onClick={()=>setActiveNav("profile")}>
                <FaRegUserCircle/>
                <p>Profile</p>
              </li>
              <li className={`items-center py-2 text-lg hover:bg-[#3e3b3b] text-gray-400 duration-75 ${activeNav === "notification" && "text-white"} hover:text-white cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4`} onClick={()=>setActiveNav("notification")}>
                <IoNotifications/>
                <p>Notification</p>
              </li>
            </ul>
          </nav>
        </div>
        <div className="bg-slate-600 w-[1px] h-full"></div>
        <div>
          {activeNav === "profile" && <Profile/>}
          {activeNav === "notification" && <Notification/>}
        </div>
      </section>
    </main>
  );
};

export default UserHeader;
