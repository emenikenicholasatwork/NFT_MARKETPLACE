"use client";
import { useGlobal } from "../../../context/GlobalContext";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import nftData from "../../../components/collections/nft.json";
import { BsCollection } from "react-icons/bs";

const Page: React.FC = () => {
  const { isNightMode } = useGlobal();
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [imageEmpty, setImageEmpty] = useState(true);
  const [showAllCollections, setShowAllCollections] = useState(false);
  const [groupedNfts, setGroupedNfts] = useState<{ [key: string]: NFT[] }>({});
  const [openNewCollection, setOpenNewCollection] = useState(false);
  const [newCollName, setNewCollName] = useState("Select a collection");
  const [nftToMintData, setNftToMintData] = useState({
    name: "",
    description: "",
    image: "",
    collection: "",
    price: "",
  })

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNftToMintData((prevData) => ({
      ...prevData,
      name: value,
    }));
    console.log(nftToMintData)
  };

  interface NFT {
    id: number;
    name: string;
    collection: string;
  }

  const imageButton = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImageChange = () => {
    if (imageRef.current && imageRef.current.files) {
      const file = imageRef.current.files[0];
      if (file) {
        const validTypes = ['image/png', 'image/svg+xml', 'image/gif', 'image/jpeg'];
        if (validTypes.includes(file.type)) {
          const reader = new FileReader();
          reader.onload = () => {
            setImagePreview(reader.result);
            setImageEmpty(false);
          };
          reader.readAsDataURL(file);
        } else {
          alert('Please select a PNG, SVG, GIF, or JPG image.');
          imageRef.current.value = '';
          setImageEmpty(true);
        }
      }
    }
  };

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
    setGroupedNfts(groupByCollection(nftData));
  }, []);

  return (
    <main className={`min-h-screen overflow-auto pt-20 w-full flex flex-col py-5 justify-center items-center`}>
      <div className="overflow-auto px-2 pb-28">
        <h1 className="text-lg lg:text-4xl">Create an NFT</h1>
        <h4 className="text-sm lg:text-lg">Once your item is minted you will not be able to change any of its information.</h4>
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-32 overflow-auto justify-center">
          <div onClick={imageButton}>
            <div className="flex flex-row justify-between gap-1 lg:gap-10 mt-5">
              {
                imageEmpty ?
                  <div className={`flex flex-col items-center justify-center  md:w-[600px] md:h-[600px] w-[350px] h-[350px] duration-100 rounded-md border-dotted border-2 ${isNightMode ? "border-white hover:bg-[#0d0e0e]" : "hover:bg-[#eaf9fb]"} border-black cursor-pointer`}>
                    <p className="text-4xl py-3">Upload</p>
                    <p>Drag and drop Image</p>
                    <p className="text-blue-700" onClick={imageButton}>Browse file</p>
                    <p className="font-thin">Max size: 50MB</p>
                    <p className="font-thin">JPG, PNG, GIF, SVG</p>
                  </div>
                  :
                  <div className="w-[350px] h-[350px]  md:w-[600px] md:h-[600px] rounded-md">
                    <img alt="nft image" src={typeof imagePreview === 'string' ? imagePreview : ''} onClick={imageButton} className="md:w-[600px] md:h-[600px] h-[350px] w-[350px] hover:scale-[1.01] duration-300 rounded-lg shadow-lg cursor-pointer" />
                  </div>
              }
              <input className="hidden" type="file" accept=".png, .svg, .gif, .jpg, .jpeg, image/png, image/svg+xml, image/gif, image/jpeg" onChange={handleImageChange} ref={imageRef} />
            </div>
          </div>
          <div className="flex flex-col flex-1 w-[330px] md:w-[600px] gap-3">
            <div className="flex flex-col w-full gap-2 relative">
              <p>Collection *</p>
              <div className={`flex flex-row items-center gap-3 border border-slate-600 duration-200 w-full p-5 rounded-md`}>
                <p className={`py-5 px-7 text-2xl rounded-md ${isNightMode ? "bg-slate-700" : "bg-slate-300"}`}><BsCollection /></p>
                <p>{newCollName}</p>
              </div>
              <div className="text-end text-blue-600">
                {
                  openNewCollection ? <p className="cursor-pointer" onClick={() => { setShowAllCollections(!showAllCollections); }}>show available collections</p> : <p className="cursor-pointer" onClick={() => setOpenNewCollection(!openNewCollection)}>create new collection</p>
                }
              </div>
              {showAllCollections &&
                <ul className={`flex flex-col overflow-auto p-5 absolute left-10 top-10 ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"} duration-300 `}>
                  {
                    Object.keys(groupedNfts).map((collectionName) => (
                      <li className="cursor-pointer hover:bg-[#9e8c8c] p-3 rounded-md" onClick={() => { setShowAllCollections(!showAllCollections); setNewCollName(collectionName); setOpenNewCollection(!openNewCollection) }}>
                        {collectionName}
                      </li>
                    ))
                  }
                </ul>
              }
            </div>
            <div className="flex flex-col gap-1">
              <p>Name *</p>
              <input className="rounded-md bg-transparent border p-2 border-slate-600" type="text" placeholder="Name your NFT" name="name" />
            </div>
            <div className={`duration-700 ease-in-out ${(openNewCollection && !showAllCollections) ? "h-[80px] " : "h-0"} flex flex-col gap-1 overflow-hidden`}>
              <p>Collections *</p>
              <input className="rounded-md bg-transparent border p-2 border-slate-600" type="text" placeholder="Name your Collection" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCollName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1">
              <p>Description *</p>
              <textarea className="rounded-md border border-slate-600 bg-transparent resize-none p-2 h-28" placeholder="Enter a description" onChange={() => onInputChange}></textarea>
            </div>
            <div className="flex flex-col gap-1">
              <p>Price (in ETH)</p>
              <input className="rounded-md bg-transparent border p-2 border-slate-600" type="text" placeholder="0.0001 ETH" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
