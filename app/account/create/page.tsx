"use client";
import { config } from "dotenv";
config();
import { useGlobal } from "../../../context/GlobalContext";
import React, { useEffect, useRef, useState } from "react";
import nftData from "../../../components/collections/nft.json";
import NftMarketplace from "../../../bin/contracts/NFTMarketplace.json";
import { BsCollection } from "react-icons/bs";
import toast from "react-hot-toast";
import axios from "axios";
import Loadingtoast from "../../../components/loading_toast/Loadingtoast";
import { BrowserProvider, ethers } from "ethers";
import { headers } from "next/headers";
const pinata_api_key = process.env.PINATA_API_KEY;
const pinata_secret_api_key = process.env.PINATA_SECRET_KEY;
const contract_address = process.env.CONTRACT_ADDRESS;

interface NFT {
  collection: string
}

const Page: React.FC = () => {
  const [openLoader, setOpenLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ipfs_image_loading, set_ipfs_image_loading] = useState(false);
  const [ipfs_metadata_loading, set_ipfs_metadata_loading] = useState(false);
  const [blockchain_loading, set_blockchain_loading] = useState(false);
  const [createClickable, setCreateClickable] = useState<boolean>(false);
  const { isNightMode } = useGlobal();
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [showAllCollections, setShowAllCollections] = useState(false);
  const [groupedNfts, setGroupedNfts] = useState<{ [key: string]: NFT[] }>({});
  const [openNewCollection, setOpenNewCollection] = useState(false);
  const [newCollName, setNewCollName] = useState("Select a collection");
  const [nftToMintData, setNftToMintData] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
  });

  const uploadImageToIpfs = async (file: File) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const data = new FormData();
    data.append("file", file);

    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        description: "NFT image",
      },
    });
    data.append("pinataMetadata", metadata);
    const options = JSON.stringify({
      cidVersion: 0,
    });
    data.append('pinataOptions', options);

    try {
      const res = await axios.post(url, data, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: pinata_api_key,
          pinata_secret_api_key: pinata_secret_api_key,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  const uploadNftToIpfs = async (nft: Object) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    try {
      const res = await axios.post(url, nft, {
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: pinata_api_key,
          pinata_secret_api_key: pinata_secret_api_key,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

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

  useEffect(() => {
    checkCreateClickable();
  }, [nftToMintData, newCollName, imagePreview]);

  const checkCreateClickable = () => {
    const isCreateClickable =
      nftToMintData.name !== "" &&
      nftToMintData.description !== "" &&
      newCollName !== "" &&
      newCollName !== "Select a collection" &&
      nftToMintData.price !== "" &&
      imagePreview !== null;
    setCreateClickable(isCreateClickable);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNftToMintData(prevData => ({
      ...prevData,
      [name]: value,
    }));
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
          };
          reader.readAsDataURL(file);
          setNftToMintData(prevData => ({
            ...prevData,
            image: file,
          }));
        } else {
          toast.error('Please select a PNG, SVG, GIF, or JPG image.');
          imageRef.current.value = '';
        }
      }
    }
  };

  const mintButton = async (e: React.FormEvent) => {
    e.preventDefault();
    setOpenLoader(true);
    if (createClickable) {
      set_ipfs_image_loading(true);
      const imageResponse = await uploadImageToIpfs(nftToMintData.image);
      if (!imageResponse) {
        setOpenLoader(false);
        toast.error("Failed to upload to IPFS");
        return;
      }
      set_ipfs_image_loading(false);
      set_ipfs_metadata_loading(true);
      const metadata = {
        name: nftToMintData.name,
        description: nftToMintData.description,
        image: `ipfs://${imageResponse.IpfsHash}`,
        collection: newCollName,
        price: nftToMintData.price,
      };
      const metadataResponse = await uploadNftToIpfs(metadata);
      const tokenURI = `ipfs://${metadataResponse.IpfsHash}`
      if (!metadataResponse) {
        setOpenLoader(false);
        toast.error("Failed to upload metadata to IPFS");
        return;
      }
      set_ipfs_metadata_loading(false);
      try {
        setLoading(true);
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setLoading(false);
        set_blockchain_loading(true);
        let contract = new ethers.Contract(NftMarketplace.address, NftMarketplace.abi, signer);
        const price = ethers.parseEther(nftToMintData.price);
        const creationPrice = await contract.getCreationPrice();
        let createTokenTrns = await contract.createToken(tokenURI, price, {
          value: creationPrice,
        });
        await createTokenTrns.wait();
        set_blockchain_loading(false);
        setLoading(true);
        const transactions = await contract.getAllItems();
        for (const i of transactions) {
          const tokenId = parseInt(i.tokenId);
          const tokenURI = await contract.tokenURI(tokenId);
          const metadata = await axios.get(tokenURI, {
            headers: {
              pinata_api_key: pinata_api_key,
              pinata_secret_api_key: pinata_secret_api_key,
            }
          });
          const price = ethers.formatEther(i.price);
          console.log(metadata, price);
        }
        setLoading(false);
        setOpenLoader(false);
        toast.success("NFT succesfully Listed");
      } catch (error) {
        setOpenLoader(false);
        toast.error("Error while connecting to wallet: " + error);
      }
    } else {
      toast.error("Details not properly filled");
    }
  };

  const imageButton = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  return (
    <main className={`min-h-screen overflow-auto pt-20 w-full flex flex-col py-5 justify-center items-center`}>
      {openLoader && <Loadingtoast ipfs_image_loading={ipfs_image_loading} ipfs_metadata_loading={ipfs_metadata_loading} blockchain_loading={blockchain_loading} loading={loading} />}
      <div className="overflow-auto px-2 pb-28">
        <h1 className="text-lg lg:text-4xl">Create an NFT</h1>
        <h4 className="text-sm lg:text-lg">Once your item is minted you will not be able to change any of its information.</h4>
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-32 overflow-auto justify-center">
          <div onClick={imageButton}>
            <div className="flex flex-row justify-between gap-1 lg:gap-10 mt-5">
              {imagePreview ? (
                <div className="w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-md">
                  <img alt="nft image" src={typeof imagePreview === 'string' ? imagePreview : ''} onClick={imageButton} className="md:w-[600px] md:h-[600px] h-[350px] w-[350px] hover:scale-[1.01] duration-300 rounded-lg shadow-lg cursor-pointer" />
                </div>
              ) : (
                <div className={`flex flex-col items-center justify-center md:w-[600px] md:h-[600px] w-[350px] h-[350px] duration-100 rounded-md border-dotted border-2 ${isNightMode ? "border-white hover:bg-[#0d0e0e]" : "hover:bg-[#eaf9fb]"} border-black cursor-pointer`}>
                  <p className="text-4xl py-3">Upload</p>
                  <p>Drag and drop Image</p>
                  <p className="text-blue-700" onClick={imageButton}>Browse file</p>
                  <p className="font-thin">Max size: 50MB</p>
                  <p className="font-thin">JPG, PNG, GIF, SVG</p>
                </div>
              )}
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
                {openNewCollection ? (
                  <p className="cursor-pointer" onClick={() => setShowAllCollections(!showAllCollections)}>show available collections</p>
                ) : (
                  <p className="cursor-pointer" onClick={() => setOpenNewCollection(!openNewCollection)}>create new collection</p>
                )}
              </div>
              {showAllCollections && (
                <ul className={`flex flex-col overflow-auto p-5 absolute left-10 top-10 ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"} duration-300`}>
                  {Object.keys(groupedNfts).map((collectionName) => (
                    <li key={collectionName} className="cursor-pointer hover:bg-[#9e8c8c] p-3 rounded-md" onClick={() => { setShowAllCollections(!showAllCollections); setNewCollName(collectionName); setOpenNewCollection(!openNewCollection); }}>
                      {collectionName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p>Name *</p>
              <input name="name" className="rounded-md bg-transparent border p-2 border-slate-600" type="text" placeholder="Name your NFT" onChange={onInputChange} />
            </div>
            <div className={`duration-700 ease-in-out ${openNewCollection && !showAllCollections ? "h-[80px]" : "h-0"} flex flex-col gap-1 overflow-hidden`}>
              <p>Collections *</p>
              <input name="collection" className="rounded-md bg-transparent border p-2 border-slate-600" type="text" placeholder="Name your Collection" onChange={(e) => { setNewCollName(e.target.value); onInputChange(e); }} />
            </div>
            <div className="flex flex-col gap-1">
              <p>Description *</p>
              <textarea name="description" className="rounded-md border border-slate-600 bg-transparent resize-none p-2 h-28" placeholder="Enter a description" onChange={onInputChange}></textarea>
            </div>
            <div className="flex flex-col gap-1">
              <p>Price (in ETH)</p>
              <input name="price" className="rounded-md bg-transparent border p-2 border-slate-600" type="number" placeholder="0.0001 ETH" onChange={onInputChange} />
            </div>
          </div>
        </div>
      </div>
      <footer className={`fixed bottom-0 left-0 right-0 flex flex-col gap-3 h-20 px-2 ${isNightMode ? "bg-[#252927] text-white" : "bg-white text-black"} duration-300`}>
        <hr />
        <div className="flex w-full justify-end pe-10">
          {
            loading ?
              <button className={`h-10 w-36 justify-center items-center duration-200 bg-blue-900 text-gray-400 cursor-not-allowed flex rounded`}>Create</button>
              :
              <button onClick={mintButton} className={`h-10 w-36 justify-center items-center duration-200 ${createClickable ? "bg-blue-600 hover:scale-110 text-white cursor-pointer" : "bg-blue-900 text-gray-400 cursor-default"} flex rounded`}>Create</button>
          }
        </div>
      </footer>
    </main>
  );
};

export default Page;
function saveSettings(settings: any): Promise<unknown> {
  throw new Error("Function not implemented.");
}

