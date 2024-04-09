"use client"
import Login from "@/components/Login";
import TrendingAndTop from "@/components/TrendingAndTop";
import { useGlobal } from "@/global/GlobalContext";


export default function Home() {
  const {isNightMode, isShowLogin} = useGlobal()
  return (
    <main className={`min-h-screen px-16 pt-28  ${isNightMode ? 'bg-[#252927]  text-white' : 'bg-white text-black'} `}>
      {isShowLogin && <Login/>}
      <TrendingAndTop/>
    </main>
  );
}
