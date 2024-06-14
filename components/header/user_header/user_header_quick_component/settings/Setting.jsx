"use client";
import { FaArrowRightArrowLeft, FaInfinity } from "react-icons/fa6";
import { IoChevronDownOutline } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";

const Setting = () => {
  const [dropdownWalletOpen, setIsDropdownWalletOpen] = useState(false);
  return (
    <div>
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
      <div className="bg-gray-200 h-96 rounded-t-2xl pt-3 px-2 items-center">
        <h1 className="text-2xl">Settings</h1>
        <div
          className="flex flex-row justify-between items-center pt-5 px-3"
          onClick={() =>
            dropdownWalletOpen
              ? setIsDropdownWalletOpen(false)
              : setIsDropdownWalletOpen(true)
          }
        >
          <div className="flex flex-row items-center gap-2">
            <div className="p-5 rounded-md bg-gray-500 text-white">
              <FaArrowRightArrowLeft />
            </div>
            <p className="text-lg">Switch Wallet</p>
          </div>
          <IoChevronDownOutline
            className={`text-xl duration-200 ${
              dropdownWalletOpen && "rotate-180"
            }`}
          />
        </div>
        <div
          className={`flex flex-col gap-3 py-3 h-0 w-0 duration-200 ease-in-out ${
            dropdownWalletOpen && "w-full h-full"
          } overflow-hidden`}
        >
          <div
            className="flex flex-row items-center hover:bg-gray-500 hover:text-white
           rounded-md ps-10 py-3 gap-2"
          >
            <Image
              className="w-10"
              src={"/icons/metamask.svg"}
              height={500}
              width={500}
            />
            <p>Metamask</p>
          </div>
          <div className="flex flex-row items-center hover:text-white hover:bg-gray-500 rounded-md ps-10 py-3 gap-2">
            <Image
              className="w-10"
              src={"/icons/Phantom-Icon_App.svg"}
              height={500}
              width={500}
            />
            <p>Phantom</p>
          </div>
          <div className="flex flex-row items-center hover:text-white hover:bg-gray-500 rounded-md ps-10 py-3 gap-2">
            <Image
              className="w-10"
              src={"/icons/coinbase.svg"}
              height={500}
              width={500}
            />
            <p>Coinbase</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Setting;
