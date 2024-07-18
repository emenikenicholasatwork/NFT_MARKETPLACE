"use client";
import Collections from "../components/collections/Collections";
import Dash from "../components/Dash";
import DashDisplay from "../components/dashDisplay/DashDisplay";
import Top from "../components/Top";
import { useGlobal } from "../context/GlobalContext";
import Footer from '../components/Footer';
import Header from "../components/header/Header";
import { useRouter } from "next/navigation";
import { retrieveCookie } from "../utils/Utils";

export default function Home() {
  const { isNightMode } = useGlobal();
  const logout = retrieveCookie("crypto~art: logout");
  const router = useRouter();
  return (
    <>
      {
        logout === "false" ? router.push("/account") :
          <div className={`min-h-screen gap-0  ${isNightMode ? "bg-[#252927]  text-white" : "bg-white text-black"} duration-300`}>
            <Header />
            <DashDisplay />
            <Dash />
            <Top />
            <Collections />
            <Footer />
          </div>
      }
    </>
  );
}
