"use client";
import Top from "../../components/Top";
import Dash from "../../components/Dash";
import DashDisplay from "../../components/dashDisplay/DashDisplay";
import UserHeader from "../../components/header/user_header/UserHeader";
import Footer from "../../components/Footer";
import { useGlobal } from "../../context/GlobalContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { retrieveCookie } from "../../utils/Utils";
import toast from "react-hot-toast";
import Collections from "../../components/collections/Collections";

interface NFT {
  price: any;
  id: any;
  seller: any;
  owner: any;
  image: any;
  name: any;
  collection: any;
  description: any;
}


const page = () => {
  const router = useRouter();
  const { isNightMode, nfts } = useGlobal();
  const [groupedNfts, setGroupedNfts] = useState<{ [key: string]: NFT[] }>({});


  useEffect(() => {
    const groupByCollection = (nfts: NFT[]): { [key: string]: NFT[] } => {
      return nfts.reduce((acc, nft) => {
        const { collection } = nft;
        if (!acc[collection]) {
          acc[collection] = [];
        }
        acc[collection].push(nft);
        return acc;
      }, {} as { [key: string]: NFT[] });
    };
    setGroupedNfts(groupByCollection(nfts));
  }, []);
  return (
    <main className={`min-h-screen gap-0 ${isNightMode ? "bg-[#252927]  text-white" : "bg-white text-black"} duration-300`}>
      <UserHeader />
      <DashDisplay />
      <Dash />
      <Top />
      <Collections />
      <Footer />
    </main>
  );
};
export default page;
