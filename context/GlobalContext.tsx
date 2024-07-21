"use client";
import { useRouter } from "next/navigation";
import * as dotenv from "dotenv";
dotenv.config();
import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  retrieveCookie,
  saveCookie,
  deleteCookie,
} from "../utils/Utils";
import { toast } from "react-hot-toast";
import { BrowserProvider, ethers } from "ethers";
import NftMarketplace from "../bin/contracts/NFTMarketplace.json";
import axios from "axios";
const INFURA_API_KEY = process.env.INFURA_API_KEY;

interface GlobalContextProps {
  isNightMode: boolean;
  setNightMode: () => void;
  isWalletConnected: boolean;
  account: string;
  activate_account: (account: string) => void;
  logout: () => void;
  login: () => void;
  signer: any;
  nfts: NFT[];
  setAllNft: (nft: NFT[]) => void;
}

interface NFT {
  price: any;
  id: any;
  seller: any;
  owner: any;
  image: any;
  name: any;
  collection: any;
  description: any;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isNightMode, setIsNightMode] = useState(true);
  const [signer, setSigner] = useState(null);
  const [nfts, setNfts] = useState<NFT[]>([]);

  const fetchAllNft = async () => {
    const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_API_KEY}`);
    const contract = new ethers.Contract(NftMarketplace.address, NftMarketplace.abi, provider);
    const transactions = await contract.getAllItems();
    const list: NFT[] = [];
    for (const i of transactions) {
      const tokenId = parseInt(i.tokenId);
      const tokenURI = await contract.tokenURI(tokenId);
      const metadata = (await axios.get(`https://gateway.pinata.cloud/ipfs/${tokenURI}`)).data;
      const price = ethers.formatEther(i.price);
      const item: NFT = {
        price,
        id: tokenId,
        seller: i.seller,
        owner: i.owner,
        image: `https://gateway.pinata.cloud/ipfs/${metadata.image}`,
        name: metadata.name,
        collection: metadata.collection,
        description: metadata.description
      }
      list.push(item);
    }
    setNfts(list);
  };

  useEffect(() => {
    const nightMode = retrieveCookie("crypto~art: dark theme");
    setIsNightMode(nightMode === "enabled");
    const logout = retrieveCookie("crypto~art: logout");
    const acc = retrieveCookie("crypto~art: account");
    setAccount(acc);
    if (logout) {
      logout === "true" ? setIsWalletConnected(false) : setIsWalletConnected(true);
    }
    fetchAllNft();
  }, []);

  const setAllNft = (nfts: []) => {
    localStorage.setItem("nfts", JSON.stringify(nfts));
    setNfts(nfts);
  }

  const activate_account = (account: string) => {
    setIsWalletConnected(true);
    setAccount(account.toString().toUpperCase());
    const u: string | undefined = retrieveCookie("crypto~art: account");
    if (u) {
      deleteCookie(u);
    }
    saveCookie("crypto~art: account", account, 7);
    const n: string | undefined = retrieveCookie("crypto~art: logout");
    if (n) {
      deleteCookie(n);
    }
    saveCookie("crypto~art: logout", "false", 7);
    router.push("/account");
  };

  const logout = () => {
    const n: string | undefined = retrieveCookie("crypto~art: logout");
    if (n) {
      deleteCookie(n);
    }
    saveCookie("crypto~art: logout", "true", 7);
    toast.success("Succesfully Logged out.")
    router.push("/");
  }

  const login = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        saveCookie("crypto~art: signer", signer, 7);
        setSigner(signer);
        const account = await provider.send("eth_requestAccounts", []);
        activate_account(account);
        const network = await provider.getNetwork();
        const chainId = network.chainId;
        const sepoliaNetworkId = "1115511";
        if (chainId.toString() !== sepoliaNetworkId) {
          toast.error("Switch your metamask to Sepolia Network")
        }
      } else {
        toast.error("Please install metamask wallet.")
      }
    } catch (error) {
      console.log(`Error while connecting metamask: ${error}`)
    }
  }

  const setNightMode = () => {
    let newNightMode: boolean;
    if (isNightMode) {
      newNightMode = false;
      toast("Light theme!", {
        icon: "☀️",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
        },
      });
    } else {
      newNightMode = true;
      toast("Dark theme!", {
        icon: "🌙",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    setIsNightMode(newNightMode);
    const n: string | undefined = retrieveCookie("crypto~art: dark theme");
    if (n) {
      deleteCookie(n);
    }
    saveCookie("crypto~art: dark theme", newNightMode ? "enabled" : "disabled", 7);
  };
  return (
    <GlobalContext.Provider
      value={{
        isNightMode,
        setNightMode,
        isWalletConnected,
        account,
        activate_account,
        logout,
        login,
        signer,
        nfts,
        setAllNft
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobal(): GlobalContextProps {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return useContext(GlobalContext);
}
