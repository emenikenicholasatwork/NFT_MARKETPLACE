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
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { isNightMode } = useGlobal();
  const logout = retrieveCookie("crypto~art: logout");
  const router = useRouter();
  return (
    logout === "false" ? router.push("/account") :
      <main className={`flex flex-col gap-3 duration-100 ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"}`}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Header />
        <DashDisplay />
        <Dash />
        <Top />
        <Collections />
        <Footer />
      </main>
  );
}
