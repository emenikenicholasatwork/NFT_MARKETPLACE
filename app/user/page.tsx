"use client";
import * as React from "react";
import Top from "../../components/Top";
import Dash from "../../components/Dash";
import DashDisplay from "../../components/dashDisplay/DashDisplay";
import Login from "../../components/Login";
import Cart from "../../components/cart/Cart";
import SearchBar from "../../components/SearchBar";
import Collections from "../../components/Collections";
import ApeCollections from "../../components/ape_nft/ApeCollections";
import ClassicCollections from "../../components/classic_nft/ClassicCollections";
import TrendingInArtCollections from "../../components/trending_in_art_nft/TrendingInArtCollections";
import AzukiCollection from "../../components/azuki_nft/AzukiCollection";
import { useGlobal } from "../../context/GlobalContext";
import UserHeader from "../../components/header/user_header/UserHeader";
import Footer from "../../components/Footer";

const page = () => {
  const { isNightMode, isShowCart, isSearchBar, isShowLogin } = useGlobal();
  return (
    <main className={`min-h-screen gap-0 ${isNightMode ? "bg-[#252927]  text-white" : "bg-[#e0f7fa] text-black"}`}>
      <UserHeader/>
      {isShowLogin && <Login />}
      {isShowCart && <Cart />}
      {isSearchBar && <SearchBar />}
      <DashDisplay />
      <Dash />
      <Top />
      <Collections />
      <AzukiCollection />
      <ApeCollections />
      <ClassicCollections />
      <TrendingInArtCollections />
      <Footer/>
    </main>
  );
};
export default page;
