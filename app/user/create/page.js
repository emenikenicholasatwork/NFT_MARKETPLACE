"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const page = () => {
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
    <main className="min-h-screen flex py-5 justify-center">
      <h1 className="text-lg font-bold">It's time to own an NFT</h1>
      <div>
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
      </div>
    </main>
  );
};
export default page;
