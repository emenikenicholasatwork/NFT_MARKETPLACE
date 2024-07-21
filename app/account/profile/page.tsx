"use client";
import * as dotenv from "dotenv";
dotenv.config();
import { useGlobal } from "../../../context/GlobalContext";
import React, { useEffect, useRef, useState } from "react";
import { BiCopy, BiLogOut } from "react-icons/bi";
import Image from "next/image";
import { IoIosCreate } from "react-icons/io";
import Link from "next/link";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import { MdWallet } from "react-icons/md";

const page: React.FC = () => {
  const {
    setNightMode,
    isNightMode,
    account,
    logout,
    nfts,
  } = useGlobal();
  const userNFT = nfts.filter((n) => n.owner === account);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const clearInput = () => {
    setInputValue("");
  };
  const first_slice = account.slice(0, 6);
  const second_slice = account.slice(38, 42);

  return (
    <div className="w-full h-screen overflow-auto">
      <head>
        <title>Your profile | Crypto~Art</title>
      </head>
      <header className={` h-20 p-5 left-0 right-0 fixed z-[2] items-center justify-between flex ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"} duration-300`}>
        <Link href={"/account"} className="flex flex-row items-center gap-1 cursor-pointer">
          <i className="bi bi-currency-bitcoin text-lg bg-green-700 p-2 rounded-md"></i>
          <p className="text-2xl md:block font-bold font-serif hidden">Crypto~Art</p>
        </Link>
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
      <section className="flex flex-col gap-5 pt-10">
        <div className="flex flex-row justify-between px-1 lg:px-10">
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 cursor-pointer hover:text-gray-300 text-sm lg:text-lg" data-tooltip-content="Copy" data-tooltip-id="copy_address_tooltip" onClick={() => navigator.clipboard.writeText(account).then(() => { toast.success("Copied") })}>
              <Tooltip id="copy_address_tooltip" />
              <p>{first_slice + "..." + second_slice}</p>
              <BiCopy />
            </div>
          </div>
        </div>
        <div className="flex flex-col px-1 lg:px-10 overflow-auto">
          <p className="md:text-lg md:font-bold">Owned NFTs</p>
          <hr />
          <div className="flex flex-wrap gap-3 overflow-auto border p-5 rounded-md w-full border-gray-300">
            {userNFT.map((nft) => (
              <div key={nft.id} className="relative duration-200 min-w-fit group rounded-lg overflow-hidden shadow-md hover:shadow-2xl">
                <Link
                  href={`/account/nft/${nft.id}`}
                  className={`block cursor-pointer  ${isNightMode ? "bg-[#9e8c8c15]" : ""
                    }`}
                >
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    className="w-[100px] h-[100px] lg:h-[200px] lg:w-[200px] group-hover:scale-105 duration-200"
                    height={200}
                    width={200}
                  />
                  <div className="items-center flex flex-col">
                    <p className="p-3 text-sm">{nft.name}</p>
                    <div className="flex w-full justify-end p-3">
                      <div>
                        <p className="font-light text-sm">Total price</p>
                        <p className="text-sm">{nft.price} ETH</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
export default page