"use client";
import Cart from "../components/cart/Cart";
import Collections from "../components/collections/Collections";
import Dash from "../components/Dash";
import DashDisplay from "../components/dashDisplay/DashDisplay";
import Login from "../components/Login";
import SearchBar from "../components/SearchBar";
import Top from "../components/Top";
import { useGlobal } from "../context/GlobalContext";
import Footer from '../components/Footer';
import Header from "../components/header/Header";

export default function Home() {
  const { isNightMode, isShowLogin, isShowCart, isSearchBar } = useGlobal();
  return (
    <main
      className={`min-h-screen gap-0  ${
        isNightMode ? "bg-[#252927]  text-white" : "bg-white text-black"
      } duration-300`}
    >
      <Header/>
      {isShowLogin && <Login />}
      {isShowCart && <Cart />}
      {isSearchBar && <SearchBar />}
      <DashDisplay />
      <Dash />
      <Top />
      <Collections />
      <Footer/>
    </main>
  );
}
