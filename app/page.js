"use client"
import ApeCollections from "@/components/ApeCollections";
import Cart from "@/components/Cart";
import ClassicCollections from "@/components/ClassicCollections";
import Collections from "@/components/Collections";
import Dash from "@/components/Dash";
import Login from "@/components/Login";
import NotableCollections from "@/components/NotableCollections";
import SearchBar from "@/components/SearchBar";
import TrendingAndTop from "@/components/TrendingAndTop";
import TrendingInArtCollections from "@/components/TrendingInArtCollections";
import { useGlobal } from "@/context/GlobalContext";


export default function Home() {
  const {isNightMode, isShowLogin, isShowCart, isSearchBar} = useGlobal()
  return (
    <main className={`min-h-screen pt-12 gap-0  ${isNightMode ? 'bg-[#252927]  text-white' : 'bg-white text-black'} `}>
      {isShowLogin && <Login/>}
      {isShowCart && <Cart/>}
      {isSearchBar && <SearchBar/>}
      <Dash/>
      <TrendingAndTop/>
      <Collections/>
      <NotableCollections/>
      <ApeCollections/>
      <ClassicCollections/>
      <TrendingInArtCollections/>
    </main>
  );
}
