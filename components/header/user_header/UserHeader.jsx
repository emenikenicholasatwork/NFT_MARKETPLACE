"use client";
import { useGlobal } from "../../../context/GlobalContext";
import React, { useState } from "react";
import styles from "./userHeader.module.css";
import { BiLogOut } from "react-icons/bi";
import { MdWallet } from "react-icons/md";
import Image from "next/image";
import { IoIosCreate } from "react-icons/io";
import Link from "next/link";
import toast from "react-hot-toast";
import { IoNotificationsOutline } from "react-icons/io5";

const UserHeader = () => {

  const {
    setNightMode,
    isNightMode,
    changeSearchState,
    logout
  } = useGlobal();
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const clearInput = () => {
    setInputValue("");
  };

  return (
    <header className={` h-20 p-5 left-0 right-0 duration-300 fixed z-[2] items-center justify-between flex ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"}`}>
      <div className="flex flex-row items-center gap-1">
        <i className="bi bi-currency-bitcoin text-lg bg-green-700 p-2 rounded-md"></i>
        <p className="text-2xl md:block font-bold font-serif hidden">Crypto~Art</p>
      </div>
      <div className="items-center lg:flex hidden focus:border-2 focus:border-white hover:bg-[#9e8c8c75] justify-center flex-row p-2 w-96 overflow-hidden rounded-md bg-[#9e8c8c25] duration-200">
        <i className="bi bi-search"></i>
        <input className=" outline-none p-2 bg-transparent w-80" onChange={handleInputChange} value={inputValue} type="text" placeholder="Search" />
        {inputValue ? (<i className="rounded-md text-lg px-2 cursor-pointer bg-[#cfc3c322] shadow-lg bi bi-x" onClick={clearInput}></i>) : (<i className="rounded-md bg-[##cfc3c322] text-lg px-1 shadow-lg">/</i>)}
      </div>
      <div className="relative flex flex-row items-center gap-2">
        <div className="flex flex-row items-center content-center p-2 px-3 justify-items-center gap-1 bg-[#9e8c8c25] duration-200 rounded-md font-bold ">
          <MdWallet className="text-2xl" />
          <p className="text-lg">0 ETH</p>
        </div>
        <div className="bg-[#9e8c8c25] px-3 py-2 hover:bg-[#9e8c8c75] duration-200 cursor-pointer rounded-md relative group">
          <Image alt="user image" className="rounded-[20px] h-[30px] w-[30px]" src={"/images/bg1.jpg"} width={500} height={500} />
          <div className={`group-hover:visible invisible duration-200 shadow-2xl absolute right-0 top-14 w-[250px] p-3 ${isNightMode ? "bg-[#1c1f1d]" : "bg-white"}`}>
            <ul>
              <Link href={"/account/profile"}>
                <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                  <i className="bi bi-person"></i>
                  <p>Profile</p>
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
              <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4" onClick={() => logout()}>
                <BiLogOut />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
