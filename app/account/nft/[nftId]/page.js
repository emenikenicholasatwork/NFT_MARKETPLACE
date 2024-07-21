"use client";
import { useGlobal } from '../../../../context/GlobalContext';
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

const Page = ({ params }) => {
  const { isNightMode } = useGlobal();
  const account = localStorage.getItem("user_address");
  const nfts = JSON.parse(localStorage.getItem("nfts"));
  const id = params.nftId;
  const nftItem = nfts.find(n => n.id.toString() === id);
  const nftItems = nfts.filter((n) => n.collection === nftItem.collection);

  return (
    <section className={styles.main_container}>
      <div className={`flex flex-col lg:flex-row ${styles.container_div}`}>
        <div className={styles.details_div_left}>
          <Image
            className={styles.nft_item_image}
            src={nftItem.image}
            width={500}
            height={500}
            alt={nftItem.name}
          />
        </div>
        <div className={styles.details_div_right}>
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
              <button className="p-[15px] w-full rounded-lg bg-gray-500 duration-200 ">Buy now</button>
            )}
          </div>
          <div className={styles.subject_description_div}>
            <h2 className={styles.subject_description_title}>
              Subject Description
            </h2>
            <p><br />{nftItem.description}</p>
          </div>
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
              <Link href={`account/nft/${nft.id}`} className={`block cursor-pointer  ${isNightMode ? "bg-[#9e8c8c15]" : ""}`}>
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
