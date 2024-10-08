"use client";
import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGlobal } from "../../../../context/GlobalContext";
import { MdWallet } from "react-icons/md";
import Image from "next/image";
import { BiLogOut } from "react-icons/bi";
import { IoIosCreate } from "react-icons/io";


const layout = ({ children }: { children: React.ReactNode }) => {
  const {
    isNightMode,
    setNightMode,
    logout,
  } = useGlobal();
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <section className={`min-h-screen min-w-full  ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"} duration-300`}>
      <header className={` h-20 py-10 left-0 right-0 fixed z-[2] ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"} duration-300 items-center justify-between px-2 lg:px-20 flex `}>
        <MdArrowBackIosNew className="cursor-pointer text-2xl" onClick={handleBack} />
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row items-center content-center p-2 px-3 justify-items-center gap-1 bg-[#9e8c8c25] hover:bg-[#9e8c8c75] duration-200 rounded-md font-bold cursor-pointer ">
            <MdWallet className="text-2xl" />
            <p className="text-lg">0 ETH</p>
          </div>
          <div className="cursor-pointer relative rounded-md group bg-[#9e8c8c25] hover:bg-[#9e8c8c75] duration-200 p-2">
            <Image alt="user image" className="h-[30px] w-[30px] rounded-full" src={"/images/bg1.jpg"} width={50} height={500} />
            <div className={`duration-200 absolute top-[45px] right-0 mt-2 w-60 p-2  invisible rounded shadow-2xl group-hover:visible ${isNightMode ? "bg-[#1c1f1d]" : "bg-white"}`}>
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
                <li className="items-center py-2 hover:bg-[#9e8c8c] cursor-pointer flex flex-row gap-3 font-bold rounded-md px-4">
                  <i className="bi bi-moon"></i>
                  <p>Night Mode</p>
                  <i className={`bi ${isNightMode ? "bi-toggle-on" : "bi-toggle-off"} font-bold text-3xl text-blue-500 ms-3 hover:text-blue-700`} onClick={() => setNightMode()}></i>
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
      <main>
        {children}
      </main>
    </section>
  );
};
export default layout;
