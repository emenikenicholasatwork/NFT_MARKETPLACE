"use client";
import { useGlobal } from '../../../context/GlobalContext';
import Image from "next/image";
import styles from "./page.module.css";
import allNfts from "../../../components/collections/nft.json";
import Link from "next/link";
import Cart from "../../../components/cart/Cart";
import Login from "../../../components/Login";
import { GrCart } from "react-icons/gr";

const page = ({ params }) => {
  const { isNightMode, isShowCart, isShowLogin, addToCartItems } = useGlobal();
  const id = params.nftId;
  
  const nft = allNfts.find((n) => n.id.toString() === id);
  const nfts = allNfts.filter((n) => n.collection === nft.collection);
  return (
    <section className={styles.main_container}>
      {isShowCart && <Cart />}
      {isShowLogin && <Login />}
      <div className={styles.container_div}>
        <div className={styles.details_div_left}>
          <Image
            className={styles.nft_item_image}
            src={nft.image}
            width={500}
            height={500}
          />
        </div>
        <div className={styles.details_div_right}>
          <div>
            <h3 className={styles.nft_name}>Notable #330</h3>
            <p>
              Owned by{" "}
              <a href="#" className={styles.owner_name}>
                WisdomWaves
              </a>
            </p>
          </div>
          <div>
            <p className={styles.collection_name}>
              {nft.collection} Collection
            </p>
          </div>
          <div>
            <p>
              views <span></span>
            </p>
          </div>
          <div className={styles.best_offer_div_right}>
            <p>Best offer</p>
            <p>
              {nft.price} ETH{" "}
              <span className={styles.price_in_dollar}>$2,867.26</span>
            </p>
            <div className={styles.offer_button_div}>
              <button className={styles.make_offer_button}>Buy now</button>
              <button
                onClick={() => addToCartItems(nft.id)}
                className={styles.make_offer_button}
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className={styles.subject_description_div}>
            <h2 className={styles.subject_description_title}>
              Subject Description
            </h2>
            <p>
              <span className={styles.by_title}>By </span>
              MissKaina <br />A distinctive and vibrant collection representing
              the rise of the divine feminine. Power, Love, and Beauty portrayed
              through the creativity of fashion, photography, and NFT.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.more_from_collection_container}>
        <h2 className={styles.more_from_collection_title}>
          More from this collection
        </h2>
        <hr />
        <div className={styles.more_nft_container}>
        {nfts.map((nft) => (
        <div key={nft.id} className="relative duration-200 min-w-fit group rounded-lg overflow-hidden shadow-md hover:shadow-2xl">
          <Link
            href={`/nft/${nft.id}`}
            className={`block cursor-pointer  ${
              isNightMode ? "bg-[#9e8c8c15]" : ""
            }`}
          >
            <Image
              src={nft.image}
              alt={nft.name}
              className="w-[200px] h-[200px] group-hover:scale-105 duration-200"
              height={200}
              width={200}
            />
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
            <button className="w-[75%] h-full border-r" onClick={(e) => e.stopPropagation()}>
              Buy now
            </button>
            <div className='w-[25%] h-full cursor-pointer flex items-center justify-center' onClick={() => addToCartItems(nft.id)}>
              <GrCart className="text-lg" />
            </div>
          </div>
        </div>
      ))}
        </div>
      </div>
    </section>
  );
};
export default page;
