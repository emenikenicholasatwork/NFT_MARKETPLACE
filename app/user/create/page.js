"use client"
import { useGlobal } from "@/context/GlobalContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const page = () => {
  const {isNightMode} = useGlobal();
  const [imagePreview, setImagePreview] = useState("");
  const imageRef = useRef();

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
        fileInputRef.current.value = '';
      }
    };
  };
  useEffect(()=>{
    console.log(imagePreview)
  },[imagePreview]);
  
  return (
    <main className={`min-h-screen w-screen flex py-5 justify-center ${isNightMode ? "bg-[#252927] text-white" : "bg-[#e0f7fa] text-black"}`}>
      <div className="flex flex-row justify-between gap-10">
        <div className="flex flex-col flex-1">
          <h1 className="text-4xl mb-2">Create an NFT</h1>
          <h4 className="mb-10">once your items i minted you will not be able to change any of it's information.</h4>
          <div onClick={()=> imageRef.current.click()}>
            <div className={`flex flex-col items-center justify-center w-[600px] h-[600px] duration-100 rounded-md border-dotted border-2 hover:bg-[#eaf9fb] ${isNightMode && "border-white hover:bg-[#0d0e0e]"} border-black cursor-pointer`}>
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
        <div className="flex flex-col flex-1">
          <div>
            <p>Collection *</p>
            <div></div>
          </div>
          <div>
            <p>Name *</p>
            <input type="text" placeholder="Name your NFT"/>
          </div>
          <div>
            <p>Description *</p>
            <textarea name="" id="" placeholder="Enter a description"></textarea>
          </div>
        </div>
      </div>
      {/* <div>
        <div>
          <label htmlFor="">NFT logo image</label>
          <div className="flex flex-row gap-5 items-center border-[1px] h-60 rounded-lg border-black">
            <div>
              <Image name="nft_image" alt="nft image" src={imagePreview} onClick={()=>imageRef.current.click()} className="w-56 h-56 rounded-lg shadow-lg cursor-pointer" height={50} width={50} /> 
              <input className="hidden" type="file" accept=".png, .svg, .gif, .jpg, .jpeg, image/png, image/svg+xml, image/gif, image/jpeg" onChange={handle_image_change} ref={imageRef}/>
            </div>
            <div>
              <p>Drag and drop or click to upload</p>
              <p>Recommended File Type: JPG, SVG, PNG, GIF</p>
            </div>
          </div>
        </div>
      </div> */}
    </main>
  );
};
export default page;
