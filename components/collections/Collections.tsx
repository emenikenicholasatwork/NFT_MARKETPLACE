"use client";
import { useGlobal } from "../../context/GlobalContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NftMarketplace from "../../bin/contracts/NFTMarketplace.json";
import { retrieveCookie } from "../../utils/Utils";
import toast from "react-hot-toast";
import axios from "axios";
import { ethers } from "ethers";
import { RotatingTriangles } from "react-loader-spinner";
const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;

interface NFT {
  id: number;
  name: string;
  description: string;
  image: string;
  collection: string;
  price: any;
  seller: any;
  owner: any;
}



const Collections: React.FC = () => {
  const [nfts, setNft] = useState([]);
  const [loading, setLoading] = useState(false);
  setLoading(true);

  const fetchAllNft = async () => {
    const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_API_KEY}`);
    const contract = new ethers.Contract(NftMarketplace.address, NftMarketplace.abi, provider);
    const transactions = await contract.getAllItems();
    const list: NFT[] = [];
    for (const i of transactions) {
      const tokenId = parseInt(i.tokenId);
      const tokenURI = await contract.tokenURI(tokenId);
      const metadata: any = await axios.get(`https://gateway.pinata.cloud/ipfs/${tokenURI}`);
      const price = ethers.formatEther(i.price);
      const item: NFT = {
        price,
        id: tokenId,
        seller: i.seller,
        owner: i.owner,
        image: `https://gateway.pinata.cloud/ipfs/${metadata.image}`,
        name: metadata.name,
        collection: metadata.collection,
        description: metadata.description
      };
      list.push(item);
    }
    localStorage.setItem("nfts", JSON.stringify(list));
    setNft(list);
  };
  fetchAllNft();

  const router = useRouter();
  const { isNightMode } = useGlobal();
  const [groupedNfts, setGroupedNfts] = useState<{ [key: string]: NFT[] }>({});

  useEffect(() => {
    const initailiser = async () => {
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
      setGroupedNfts(groupByCollection((await nfts)));
    }
    initailiser();
    setLoading(false);
  }, [nfts]);
  return (
    <section className="pb-32">
      <div className=" min-h-fit flex justify-center py-5 px-5">
        <p className="text-4xl font-extrabold">Collections......</p>
      </div>
      {
        loading ?
          <div className="h-full w-full flex items-center justify-center">
            <RotatingTriangles
              visible={true}
              height="200"
              width="200"
              ariaLabel="rotating-triangles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />        </div> :
          Object.keys(groupedNfts).map((collectionName) => (
            <div
              key={collectionName}
              className=" flex flex-col min-h-fit py-2 px-5 lg:px-20 gap-1"
            >
              <div className="flex flex-col justify-between ">
                <p className="font-bold text-lg">{collectionName} Collections</p>
              </div>
              <div className="flex gap-3 flex-row items-center overflow-x-auto p-3">
                {groupedNfts[collectionName].map((nft) => (
                  <div
                    onClick={() => {
                      const logout = retrieveCookie("crypto~art: logout");
                      if (logout === "true") {
                        toast("you need to connect wallet to see this page")
                      } else {
                        router.push(`account/nft/${nft.id}`)
                      }
                    }}
                    key={nft.id}
                    className={`rounded-lg overflow-hidden hover:-translate-y-1 min-w-fit cursor-pointer duration-200 shadow-md hover:shadow-2xl ${isNightMode ? "bg-[#9e8c8c15]" : ""
                      } `}
                  >
                    <Image
                      alt={nft.name}
                      src={nft.image}
                      className="w-[200px] h-[200px]"
                      height={500}
                      width={500}
                    />
                    <div className="items-center flex flex-col">
                      <p className="p-3 text-sm">{nft.name}</p>
                      <div className="flex w-full justify-end p-3">
                        <div>
                          <p className="font-light text-sm">Total Price</p>
                          <p className="text-sm">{nft.price} ETH</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
      }
    </section>
  );
};

export default Collections;
