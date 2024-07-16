"use client";
import React, { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGlobal } from "../../../context/GlobalContext";
import Swap from "../../../components/acc_comp/head_comp/swap/Swap";
import Crypto from "../../../components/acc_comp/head_comp/crypto/Crypto";
import Setting from "../../../components/acc_comp/head_comp/settings/Setting";
import Transactions from "../../../components/acc_comp/head_comp/transactions/Transactions";
import { AiFillDollarCircle, AiOutlineDollar } from "react-icons/ai";
import {
  MdOutlineSwapHorizontalCircle,
  MdSwapHorizontalCircle,
  MdWallet,
} from "react-icons/md";
import {
  IoNotificationsSharp,
  IoSettings,
  IoSettingsOutline,
} from "react-icons/io5";
import Image from "next/image";
import { FaListUl } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";

const layout = ({ children }:{ children: React.ReactNode }) => {
  const {
    isUserHeaderWalletInfo,
    isNightMode,
    setUserHeaderWalletInfo,
    setNightMode,
    activate_account,
    setShowCart,
    cartItems
  } = useGlobal();
  const [activeTab, setActiveTab] = useState("crypto");
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
      <section className={`min-h-screen min-w-full  ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"} duration-300`}>
        <header className={` h-20 py-10 left-0 right-0 fixed z-[2] ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"} duration-300 items-center justify-between px-20 flex `}>
          <MdArrowBackIosNew
            className="cursor-pointer text-2xl"
            onClick={handleBack}
          />
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center content-center p-2 px-3 justify-items-center gap-1 bg-[#9e8c8c25] hover:bg-[#9e8c8c75] duration-200 rounded-md font-bold cursor-pointer " onClick={() => setUserHeaderWalletInfo()}>
              <MdWallet className="text-2xl" />
              <p className="text-lg">0 ETH</p>
            </div>
            {isUserHeaderWalletInfo && (
              <div className={`absolute top-[60px] right-[50px] mt-2 w-[400px] rounded shadow  ${isNightMode ? "bg-[#1c1f1d]" : "bg-white"} `}>
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
                      className={`flex active flex-col items-center cursor-pointer ${isNightMode ? `text-gray-400 ${activeTab === "crypto" && "text-white"}` : `text-[#66696b] ${activeTab === "crypto" && "text-black"}`}`}>
                      {activeTab === "crypto" ? (
                        <AiFillDollarCircle />
                      ) : (
                        <AiOutlineDollar />
                      )}
                      <p>Crypto</p>
                    </div>
                    <div
                      onClick={() => setActiveTab("swap")}
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
                      {activeTab === "swap" ? (
                        <MdSwapHorizontalCircle />
                      ) : (
                        <MdOutlineSwapHorizontalCircle />
                      )}
                      <p>Swap</p>
                    </div>
                    <div
                      onClick={() => setActiveTab("transactions")}
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
                      {activeTab === "transactions" ? (
                        <FaListAlt />
                      ) : (
                        <FaListUl />
                      )}
                      <p>Transactions</p>
                    </div>
                    <div
                      onClick={() => setActiveTab("settings")}
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
                      {activeTab === "settings" ? (
                        <IoSettings />
                      ) : (
                        <IoSettingsOutline />
                      )}
                      <p>Settings</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="cursor-pointer relative rounded-md group bg-[#9e8c8c25] hover:bg-[#9e8c8c75] duration-200 p-2">
              <Image
                alt="user image"
                className="h-[30px] w-[30px] rounded-full"
                src={"/images/bg1.jpg"}
                width={500}
                height={500}
              />
              <div
                className={`duration-200 absolute top-[45px] right-0 mt-2 w-60 p-2  invisible rounded shadow-2xl group-hover:visible ${
                  isNightMode ? "bg-[#1c1f1d]" : "bg-white"
                }`}
              >
                <ul>
                  <Link href={"/user/profile"}>
                    <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                      <i className="bi bi-person"></i>
                      <p>Profile</p>
                    </li>
                  </Link>
                  <Link href={"/user/watchlist"}>
                    <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                      <i className="bi bi-eye"></i>
                      <p>WatchList</p>
                    </li>
                  </Link>
                  <Link href={"/user/notification"}>
                    <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                      <IoNotificationsSharp />
                      <p>Notification</p>
                    </li>
                  </Link>
                  <Link href={"/user/create"}>
                    <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                      <IoIosCreate />
                      <p>Create NFT</p>
                    </li>
                  </Link>
                  <hr className="my-2" />
                  <Link href={"/user/settings"}>
                    <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                      <i className="bi bi-gear"></i>
                      <p>Settings</p>
                    </li>
                  </Link>
                  <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
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
                  <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                    <i className="bi bi-journals"></i>
                    <p>Learn</p>
                  </li>
                  <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                    <i className="bi bi-question-circle"></i>
                    <p>Help center</p>
                  </li>
                  <hr className="my-2" />
                  <Link href={"/"} onClick={() => activate_account(null)}>
                    <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                      <BiLogOut />
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
          </div>
        </header>
        <main>
        {children}
        </main>
      </section>
  );
};
export default layout;
