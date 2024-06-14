"use client";
import { useGlobal } from "@/context/GlobalContext";
import Image from "next/image";
import anime_collection from "../azuki_nft/azuki_nft.json";
import trending_in_art_collection from "../trending_in_art_nft/trending_in_art_nft.json";
import ape_collection from "../ape_nft/ape_nft.json";
import classic_collection from "../classic_nft/classic_nft.json";

const Cart = () => {
  const { setShowCart, isShowCart, setLogin, cartItems, isLoggedIn } =
    useGlobal();
  const allNfts = [
    ...anime_collection,
    ...trending_in_art_collection,
    ...classic_collection,
    ...ape_collection,
  ];
  const nftInCart = allNfts.filter((n) => cartItems.includes(n.id));
  return (
    <div
      className={`bg-blurBackground text-black fixed w-full h-full left-0 top-0 z-10 justify-end flex`}
    >
      <div
        className={`${
          isShowCart ? "w-80" : "w-0"
        } transition-all duration-200 ease-in-out h-full bg-white rounded-t-2xl mt-5 flex flex-col`}
      >
        <div className="flex flex-row justify-between p-5">
          <div className="flex flex-row font-bold gap-3">
            <p>Your cart</p>
            <i className="bi bi-info-circle"></i>
          </div>
          <i
            className="bi bi-x-lg text-lg cursor-pointer"
            onClick={setShowCart}
          ></i>
        </div>
        <hr />
        <div className="flex flex-col justify-between p-3">
          <div className="flex flex-row justify-between p-3">
            <p>{cartItems.length} item</p>
            <p className="cursor-pointer">Clear all</p>
          </div>
          <hr />
        </div>
        <div className="overflow-auto pb-20">
          <div>
            {nftInCart.map((nft) => (
              <div>
                <div
                  className="flex flex-row items-center justify-between px-3"
                  key={nft.id}
                >
                  <Image
                    className="w-16 h-16 rounded-xl"
                    width={20}
                    height={20}
                    src={nft.image}
                  />
                  <div>
                    <p className="font-bold text-sm">{nft.name}</p>
                    <p className="text-sm">Selection of invasion</p>
                    <p className="font-light text-sm">Creator earning: 5%</p>
                  </div>
                  <p>{nft.floor} ETH</p>
                </div>
                <hr className="my-3" />
              </div>
            ))}
          </div>
          <div className="px-3 flex flex-row justify-between">
            <p className="font-bold text-sm">Total Price</p>
            <div className="flex flex-col items-end">
              <p className="font-bold">62 ETH</p>
              <p className="font-light text-sm">$225,467.96</p>
            </div>
          </div>
          <div className="px-3">
            <button
              className="w-full p-3 bg-blue-600 my-3 text-white rounded-xl hover:scale-105 shadow-lg hover:bg-blue-800 duration-200"
              onClick={() => (isLoggedIn ? "" : setLogin())}
            >
              Complete purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
