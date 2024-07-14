"use client";
import { useGlobal } from "../../../context/GlobalContext";
import React, { useRef, useState } from "react";
import { MdOutlineSwapHorizontalCircle, MdSell, MdSwapHorizontalCircle, MdWallet } from "react-icons/md";
import { IoCreateSharp, IoNotificationsSharp, IoSettings, IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import { IoIosCreate } from "react-icons/io";
import { AiFillDollarCircle, AiOutlineDollar } from "react-icons/ai";
import { FaDollarSign, FaListUl } from "react-icons/fa6";
import { FaArrowAltCircleDown, FaListAlt } from "react-icons/fa";
import Swap from "../../../components/acc_comp/head_comp/swap/Swap";
import Crypto from "../../../components/acc_comp/head_comp/crypto/Crypto";
import Transactions from "../../../components/acc_comp/head_comp/transactions/Transactions";
import Setting from "../../../components/acc_comp/head_comp/settings/Setting";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiSettings } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import data from "../../../components/collections/nft.json";
import { MoonLoader } from "react-spinners";

const page: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("crypto");
  const [activeNav, setActiveNav] = useState<string>("created");
  const image1Ref = useRef<HTMLInputElement>(null);
  const image2Ref = useRef<HTMLInputElement>(null);
  const [image1Loading, setImage1Loading] = useState<boolean>(false);
  const [image2Loading, setImage2Loading] = useState<boolean>(false);
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);
  let nfts = data;

  const {
    setNightMode,
    isNightMode,
    isLoggedIn,
    cartItems,
    changeSearchState,
    setLogin,
    account,
    isShowLogin,
    isUserHeaderWalletInfo,
    setUserHeaderWalletInfo,
    setShowCart,
    activate_account
  } = useGlobal();
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const clearInput = () => {
    setInputValue("");
  };
  const first_slice = account.slice(0, 6);
  const second_slice = account.slice(38, 42);
  const handleImage1Change =(e: React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0];
    if(file){
      const reader = new FileReader();
      setImage1Loading(true);
      reader.onloadend=()=>{
        setImage1(reader.result as string);
        setImage1Loading(false);
      };
      reader.readAsDataURL(file);
    }
  }
  const handleImage2Change =(e: React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0];
    if(file){
      const reader = new FileReader();
      setImage2Loading(true);
      reader.onloadend=()=>{
        setImage2(reader.result as string);
        setImage2Loading(false);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="w-full h-screen overflow-auto">
        <head>
          <title>Your profile | Crypto~Art</title>
        </head>
      <header className={` h-20 p-5 left-0 right-0 fixed z-[2] items-center justify-between flex ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"} duration-300`}>
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
            <div className={`absolute top-[60px] right-[50px] w-[400px] overflow-hidden rounded shadow-lg duration-300 ${isNightMode ? "bg-[#1c1f1d]" : "bg-white"} `}>
              {activeTab === "crypto" && <Crypto />}
              {activeTab === "swap" && <Swap />}
              {activeTab === "transactions" && <Transactions />}
              {activeTab === "settings" && <Setting />}
              <div className={`flex flex-col ${isNightMode ? "dark:bg-gray-900" : "bg-gray-200"}`}>
                <hr className="bg-white w-full border-white" />
                <div className="flex flex-row justify-between p-3">
                  <div onClick={() => setActiveTab("crypto")} id="bottom_nav" className={`flex active flex-col items-center cursor-pointer ${isNightMode ? `text-gray-400 ${activeTab === "crypto" && "text-white"}` : `text-[#66696b] ${activeTab === "crypto" && "text-black"}`}`}>
                    {activeTab === "crypto" ? <AiFillDollarCircle/> : <AiOutlineDollar />}
                    <p>Crypto</p>
                  </div>
                  <div onClick={() => setActiveTab("swap")} id="bottom_nav" className={`flex flex-col items-center cursor-pointer ${isNightMode ? `text-gray-400 ${activeTab === "swap" && "text-white"}` : `text-[#66696b] ${activeTab === "swap" && "text-black"}`}`}>
                    {activeTab === "swap" ? <MdSwapHorizontalCircle/> : <MdOutlineSwapHorizontalCircle />}
                    <p>Swap</p>
                  </div>
                  <div onClick={() => setActiveTab("transactions")} id="bottom_nav" className={`flex flex-col items-center cursor-pointer ${isNightMode ? `text-gray-400 ${activeTab === "transactions" && "text-white"}` : `text-[#66696b] ${activeTab === "transactions" && "text-black"}`}`}>
                    {activeTab === "transactions" ? <FaListAlt/> : <FaListUl/>}
                    <p>Transactions</p>
                  </div>
                  <div onClick={() => setActiveTab("settings")} id="bottom_nav" className={`flex flex-col items-center cursor-pointer ${isNightMode ? `text-gray-400 ${activeTab === "settings" && "text-white"}`: `text-[#66696b] ${activeTab === "settings" && "text-black"}`}`}>
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
      <section className="flex flex-col gap-5">
        <div className="relative h-[520px]">
          <input type="file" accept=".png, .svg, .gif, .jpg, .jpeg, image/png, image/svg+xml, image/gif, image/jpeg"  ref={image1Ref} className="hidden" onChange={handleImage1Change} />
          <input type="file" accept=".png, .svg, .gif, .jpg, .jpeg, image/png, image/svg+xml, image/gif, image/jpeg"  ref={image2Ref} className="hidden" onChange={handleImage2Change} />
          {image1Loading ? (<MoonLoader color="#e5cbcb" />) : (<img src={image1 || '/images/default-profile.png'} alt="cover pics" className="w-full h-[500px] object-cover cursor-pointer" onClick={()=>image1Ref.current.click()}/>)}
          {image1Loading ? (<MoonLoader color="#e5cbcb" />) : (<img src={image1 || '/images/default-profile.png'} alt="profile pics"  className="w-56 h-56 object-cover rounded-full absolute bottom-0 left-10 shadow-2xl cursor-pointer" onClick={()=>image2Ref.current.click()}/>)}
        </div>
        <div className="flex flex-row justify-between px-10">
          <div className="flex flex-col">
            <p className="font-bold text-xl">Unnamed</p>
            <div className="flex flex-row items-center gap-5">
              <Tooltip id="copy_address_tooltip"/>
              <p data-tooltip-content="Copy" data-tooltip-id="copy_address_tooltip" className="cursor-pointer hover:text-gray-300" onClick={()=>navigator.clipboard.writeText(account).then(()=>{toast.success("Copied")})}>{first_slice+"..."+second_slice}</p>
              <p className="text-gray-300">Joined july 2024</p>
            </div>
          </div>
          <Link href={"/account/settings"} className="flex items-center">
            <FiSettings className="cursor-pointer text-xl hover:text-gray-300"/>
          </Link>
        </div>
        <div className="flex flex-col px-10 overflow-auto">
          <nav>
            <ul className="flex flex-row items-center">
              <li className={`flex flex-row items-center p-5 cursor-pointer ${activeNav === "created" && "text-white"} text-gray-400 hover:text-white duration-200 gap-2`} onClick={()=>setActiveNav("created")}>
                <IoCreateSharp/>
                <p>Created</p>
              </li>
              <li className={`flex flex-row items-center p-5 cursor-pointer ${activeNav === "bought" && "text-white"} text-gray-400 hover:text-white duration-200 gap-2`} onClick={()=>setActiveNav("bought")}>
                <FaDollarSign/>
                <p>Bought</p>
              </li>
              <li className={`flex flex-row items-center p-5 cursor-pointer ${activeNav === "sold" && "text-white"} text-gray-400 hover:text-white duration-200 gap-2`} onClick={()=>setActiveNav("sold")}>
                <MdSell/>
                <p>Sold</p>
              </li>
              <li className={`flex flex-row items-center p-5 cursor-pointer ${activeNav === "owned" && "text-white"} text-gray-400 hover:text-white duration-200 gap-2`} onClick={()=>setActiveNav("owned")}>
                <FaArrowAltCircleDown/>
                <p>Own (Currently)</p>
              </li>
            </ul>
          </nav>
          <hr />
          <div className="flex flex-wrap gap-3 overflow-auto border p-5 rounded-md w-full border-gray-300">
          {nfts.map((nft) => (
        <div key={nft.id} className="relative duration-200 min-w-fit group rounded-lg overflow-hidden shadow-md hover:shadow-2xl">
          <Link
            href={`/nft/${nft.id}`}
            className={`block cursor-pointer  ${
              isNightMode ? "bg-[#9e8c8c15]" : ""
            }`}
          >
            <Image
              src={nft.image}
              alt={nft.name}
              className="w-[200px] h-[200px] group-hover:scale-105 duration-200"
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