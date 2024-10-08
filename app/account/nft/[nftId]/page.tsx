"use client";
import { useGlobal } from '../../../../context/GlobalContext';
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Loadingtoast from '../../../../components/loading_toast/Loadingtoast';
import { useEffect, useState } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import NftMarketplace from "../../../../bin/contracts/NFTMarketplace.json";
import toast from "react-hot-toast";

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

const Page = ({ params }) => {
  const nfts: any = JSON.parse(localStorage.getItem("nfts"));
  const { isNightMode, connectToSmartContract } = useGlobal();
  const account = localStorage.getItem("user_address");
  const [openLoader, setOpenLoader] = useState(false);
  const [buyingLoad, setBuyingLoad] = useState(false);
  const id = params.nftId;
  const nftItem = nfts.find((n: { id: { toString: () => NFT; }; }) => n.id.toString() === id);
  const nftItems = nfts.filter((n: { collection: NFT }) => n.collection === nftItem.collection);

  // useEffect(() => {
  //   const initialiser = async () => {
  //     const groupByCollection=(nfts: NFT[]): {[key: string]: NFT[]}=>{
  //       return nfts.reduce((acc, nft)=>{
  //         const { collection } = nfts;
  //         if(!acc[collection]){
  //           acc[collection] = [];
  //         }
  //         acc[collection].push(nfts);
  //         return acc;
  //       })
  //     }
  //   }
  //   initialiser()
  // }, [nfts])

  const buyNft = async (tokenId: number, price: number) => {
    setBuyingLoad(true);
    setOpenLoader(true);
    try {
      if (!window.ethereum) {
        toast.error("MetaMask is not installed.");
        setOpenLoader(false);
        setBuyingLoad(false);
        return;
      }
      const contract = await connectToSmartContract();
      const value = ethers.parseEther(price.toString());
      const trnx = await contract.buyToken(tokenId, { value: value });
      await trnx.wait();

      setOpenLoader(false);
      setBuyingLoad(false);
      toast.success("NFT purchased successfully!");
      window.location.reload();
    } catch (error) {
      setOpenLoader(false);
      setBuyingLoad(false);

      if (error.message.includes("insufficient funds")) {
        toast.error("Insufficient funds.");
      } else if (error.code === -32002) {
        toast.error("MetaMask request already in process. Please check your MetaMask extension.");
      } else if (error.message.includes("user rejected transaction")) {
        toast.error("Transaction rejected by user.");
      } else {
        console.error("Error while buying NFT:", error);
        toast.error("Error while buying NFT.");
      }
    }
  }


  return (
    <section className={styles.main_container}>
      {openLoader && <Loadingtoast buyingLoad={buyingLoad} ipfs_image_loading={false} ipfs_metadata_loading={false} blockchain_loading={false} loading={false} />}
      <div className={`flex flex-col lg:flex-row ${styles.container_div}`}>
        <div className={styles.details_div_left}>
          {nftItem && (
            <Image
              className={styles.nft_item_image}
              src={nftItem.image}
              width={500}
              height={500}
              alt={nftItem.name}
            />
          )}
        </div>
        <div className={styles.details_div_right}>
          {nftItem && (
            <>
              <div>
                <h3 className={styles.nft_name}>{nftItem.name}</h3>
                <p>
                  Owned by{" "}
                  <a href="#" className={styles.owner_name}>
                    {nftItem.owner}
                  </a>
                </p>
              </div>
              <div>
                <p className={styles.collection_name}>
                  {nftItem.collection} Collection
                </p>
              </div>
              <div className={styles.best_offer_div_right}>
                <p>Best offer</p>
                <p>{nftItem.price} ETH{" "}</p>
                {nftItem.owner.toString().toLowerCase() === account.toLowerCase() ? (
                  <button className={styles.make_offer_button}>You own this NFT</button>
                ) : (
                  <button onClick={() => buyNft(nftItem.id, nftItem.price)} className="p-[15px] w-full rounded-lg bg-gray-500 duration-200 ">Buy now</button>
                )}
              </div>
              <div className={styles.subject_description_div}>
                <h2 className={styles.subject_description_title}>
                  Subject Description
                </h2>
                <p><br />{nftItem.description}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.more_from_collection_container}>
        <h2 className={styles.more_from_collection_title}>
          More from this collection
        </h2>
        <hr />
        <div className={styles.more_nft_container}>
          {nftItems.map((nft) => (
            <div key={nft.id} className="relative duration-200 group rounded-lg overflow-hidden shadow-md hover:shadow-2xl">
              <Link href={`/account/nft/${nft.id}`} className={`block cursor-pointer  ${isNightMode ? "bg-[#9e8c8c15]" : ""}`}>
                <Image src={nft.image} alt={nft.name} className="w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] group-hover:scale-105 duration-200" height={200} width={200} />
                <div className="items-center flex flex-col">
                  <p className="p-3 text-sm">{nft.name}</p>
                  <div className="flex w-full justify-end p-3">
                    <div>
                      <p className="font-light text-sm">Total price</p>
                      <p className="text-sm">{nft.price} ETH</p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="h-0 group-hover:h-8 duration-100 overflow-hidden bg-blue-700 absolute z-30 flex flex-row items-center right-0 left-0 bottom-0">
                <button className="w-full h-full" onClick={(e) => e.stopPropagation()}>
                  Buy now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
