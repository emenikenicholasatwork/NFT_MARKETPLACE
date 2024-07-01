"use client"
import { useGlobal } from "../../../context/GlobalContext";
import * as React from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const page: React.FC = () => {

  const {isNightMode} = useGlobal();
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>("");
  const imageRef = React.useRef<HTMLInputElement>();

  const handle_image_change =()=>{
    const file = imageRef.current.files[0];
    if (file) {
      const validTypes = ['image/png', 'image/svg+xml', 'image/gif', 'image/jpeg'];
      if (validTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a PNG, SVG, GIF, or JPG image.');
        imageRef.current.value = '';
      }
    };
  };
  useEffect(()=>{
    console.log(imagePreview)
  },[imagePreview]);
  
  return (
    <main className={`min-h-screen pt-32 w-screen flex flex-col py-5 justify-center items-center ${isNightMode ? "bg-[#252927] text-white" : "bg-[#e0f7fa] text-black"} relative`}>
      <div className="flex flex-col flex-1">
        <h1 className="text-4xl">Create an NFT</h1>
        <h4 className="">once your items is minted you will not be able to change any of it's information.</h4>
        <div className="flex flex-row items-center gap-32 justify-center">
        <div onClick={()=> imageRef.current.click()}>
        <div className="flex flex-row justify-between gap-10 mt-5">
              <div className={`flex flex-col items-center justify-center w-[600px] h-[600px] duration-100 rounded-md border-dotted border-2  ${isNightMode ? "border-white hover:bg-[#0d0e0e]" : "hover:bg-[#eaf9fb]"} border-black cursor-pointer`}>
                <p className="text-4xl py-3">Upload</p>
                <p>Drag and drop Image</p>
                <p className="text-blue-700" onClick={()=> imageRef.current.click()}>Browse file</p>
                <p className="font-thin">Max size: 50MB</p>
                <p className="font-thin">JPG,PNG, GIF, SVG</p>
              </div>
              {/* <Image name="nft_image" alt="nft image" src={imagePreview} onClick={()=>imageRef.current.click()} className="w-[600px] h-[600px] rounded-lg shadow-lg cursor-pointer" height={50} width={50} />  */}
              <input className="hidden" type="file" accept=".png, .svg, .gif, .jpg, .jpeg, image/png, image/svg+xml, image/gif, image/jpeg" onChange={handle_image_change} ref={imageRef}/>
            </div>
          </div>
          <div className="flex flex-col flex-1 w-[600px]">
            <div className="flex flex-col w-full gap-2">
              <p>Collection *</p>
              <div className={`flex flex-row items-center gap-3 bg-[#202222] duration-200 w-full p-5 rounded-md  ${isNightMode ?  "hover:bg-[#0d0e0e]" : "hover:bg-[#eaf9fb]"} cursor-pointer `}>
                <p className="py-5 px-7 text-2xl rounded-md bg-[#0d0e0e]">+</p>
                <p>Create new collection</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p>Name *</p>
              <input className="rounded-md bg-transparent border p-2 border-slate-600" type="text" placeholder="Name your NFT"/>
            </div>
            <div className="flex flex-col gap-1">
              <p>Description *</p>
              <textarea className="rounded-md border border-slate-600 bg-transparent resize-none p-2 h-28" name="" id="" placeholder="Enter a description"></textarea>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default page;
