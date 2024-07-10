"use client";
import { useGlobal } from "../../../context/GlobalContext";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

const Page: React.FC = () => {
  const { isNightMode } = useGlobal();
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [imageEmpty, setImageEmpty] = useState(true);
  const [collectCreateMode, setCollectionCreateMode] = useState(true);

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
    console.log(imagePreview);
  }, [imagePreview]);

  return (
    <main className={`min-h-screen pt-32 w-screen flex flex-col py-5 justify-center items-center relative`}>
      <div className="flex flex-col flex-1">
        <h1 className="text-4xl">Create an NFT</h1>
        <h4>Once your item is minted you will not be able to change any of its information.</h4>
        <div className="flex flex-row items-center gap-32 justify-center">
          <div onClick={imageButton}>
            <div className="flex flex-row justify-between gap-10 mt-5">
              {
                imageEmpty ?
                  <div className={`flex flex-col items-center justify-center w-[600px] h-[600px] duration-100 rounded-md border-dotted border-2 ${isNightMode ? "border-white hover:bg-[#0d0e0e]" : "hover:bg-[#eaf9fb]"} border-black cursor-pointer`}>
                    <p className="text-4xl py-3">Upload</p>
                    <p>Drag and drop Image</p>
                    <p className="text-blue-700" onClick={imageButton}>Browse file</p>
                    <p className="font-thin">Max size: 50MB</p>
                    <p className="font-thin">JPG, PNG, GIF, SVG</p>
                  </div>
                  :
                  <div className="w-[600px] h-[600px] rounded-md">
                    <img alt="nft image" src={typeof imagePreview === 'string' ? imagePreview : ''} onClick={imageButton} className="w-[600px] h-[600px] hover:scale-[1.01] duration-300 rounded-lg shadow-lg cursor-pointer" />
                  </div>
              }
              <input className="hidden" type="file" accept=".png, .svg, .gif, .jpg, .jpeg, image/png, image/svg+xml, image/gif, image/jpeg" onChange={handleImageChange} ref={imageRef} />
            </div>
          </div>
          <div className="flex flex-col flex-1 w-[600px] gap-3">
            <div className="flex flex-col w-full gap-2">
              <p>Collection *</p>
              <div className={`flex flex-row items-center gap-3 border border-slate-600 duration-200 w-full p-5 rounded-md cursor-pointer `}>
                <p className={`py-5 px-7 text-2xl rounded-md ${isNightMode ? "bg-slate-700" : "bg-slate-300"}`}>+</p>
                <p>Create new collection</p>
              </div>
              <div className="text-end text-blue-600">
                {
                  collectCreateMode ? <p className="cursor-pointer">show available collections</p> : <p className="cursor-pointer">create new collection</p>
                }
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p>Name *</p>
              <input className="rounded-md bg-transparent border p-2 border-slate-600" type="text" placeholder="Name your NFT" />
            </div>
            <div className="flex flex-col gap-1">
              <p>Description *</p>
              <textarea className="rounded-md border border-slate-600 bg-transparent resize-none p-2 h-28" placeholder="Enter a description"></textarea>
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
