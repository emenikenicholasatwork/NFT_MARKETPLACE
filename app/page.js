"use client"
import ApeCollections from "@/components/ApeCollections";
import Cart from "@/components/Cart";
import ClassicCollections from "@/components/ClassicCollections";
import Collections from "@/components/Collections";
import Dash from "@/components/Dash";
import DashDisplay from "@/components/dashDisplay/DashDisplay";
import Login from "@/components/Login";
import SearchBar from "@/components/SearchBar";
import Top from "@/components/Top";
import TrendingInArtCollections from "@/components/TrendingInArtCollections";
import { useGlobal } from "@/context/GlobalContext";
import AnimeCollection from "@/components/AnimeCollection";


export default function Home() {
  const {isNightMode, isShowLogin, isShowCart, isSearchBar} = useGlobal()
  return (
    <main className={`min-h-screen pt-12 gap-0  ${isNightMode ? 'bg-[#252927]  text-white' : 'bg-[#e0f7fa] text-black'} `}>
      {isShowLogin && <Login/>}
      {isShowCart && <Cart/>}
      {isSearchBar && <SearchBar/>}
      <DashDisplay/>
      <Dash/>
      <Top/>
      <Collections/>
      <AnimeCollection/>
      <ApeCollections/>
      <ClassicCollections/>
      <TrendingInArtCollections/>
    </main>
  );
}
