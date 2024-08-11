"use client";
import { useRouter } from "next/navigation";
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
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

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

interface GlobalContextProps {
  isNightMode: boolean;
  setNightMode: () => void;
  isWalletConnected: boolean;
  account: string;
  activate_account: (account: string) => void;
  logout: () => void;
  login: () => void;
  nfts: NFT[];
  connectToSmartContract: () => any;
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
  const [nfts, setNfts] = useState<NFT[]>([]);


  const fetchAllNft = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);
      const contract = new ethers.Contract(NftMarketplace.address, NftMarketplace.abi, provider);
      const transactions = await contract.getAllItems();
      const uniqueTokenURIs = new Set<number>();
      const list: NFT[] = [];
      transactions.forEach((i: any) => {
        uniqueTokenURIs.add(parseInt(i.tokenId));
      })
      const metadataResponses = await Promise.all(
        Array.from(uniqueTokenURIs).map(async (uri) => {
          try {
            const tokenURI = await contract.tokenURI(uri);
            return await axios.get(`https://gateway.pinata.cloud/ipfs/${tokenURI}`);
          } catch (error) {
            toast.error(`Failed to fetch metadata for URI: ${uri}`, error);
            return null;
          }
        })
      );
      const metadataMap = new Map<number, any>();
      Array.from(uniqueTokenURIs).forEach((uri, index) => {
        if (metadataResponses[index]) {
          metadataMap.set(uri, metadataResponses[index].data);
        }
      });
      transactions.forEach((i: any) => {
        const tokenId = parseInt(i.tokenId);
        const metadata = metadataMap.get(tokenId);
        if (metadata) {
          const price = ethers.formatEther(i.price);
          const item: NFT = {
            price,
            id: tokenId,
            seller: i.seller,
            owner: i.owner,
            image: `https://gateway.pinata.cloud/ipfs/${metadata.image}`,
            name: metadata.name,
            collection: metadata.collection,
            description: metadata.description,
          };
          list.push(item);
        }
      });
      setNfts(list);
      localStorage.setItem("nfts", JSON.stringify(list));
      return list;
    } catch (error) {
      toast.error("Error fetching NFTs:", error);
    }
  }

  const connectToSmartContract = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(NftMarketplace.address, NftMarketplace.abi, signer);
    return contract;
  }

  useEffect(() => {
    const initialize = async () => {
      const nightMode = retrieveCookie("crypto~art: dark theme");
      setIsNightMode(nightMode === "enabled");

      const logout = retrieveCookie("crypto~art: logout");
      const acc = retrieveCookie("crypto~art: account");
      setAccount(acc);
      if (logout) {
        setIsWalletConnected(logout !== "true");
      } else {
        saveCookie("crypto~art: logout", true, 7);
      }
      setNfts(await fetchAllNft());
    };
    initialize();
  }, []);

  const activate_account = (account: string) => {
    setIsWalletConnected(true);
    setAccount(account);
    const u: string | undefined = localStorage.getItem("user_address");
    if (u) {
      deleteCookie(u);
    }
    localStorage.setItem("user_address", account);
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
        nfts,
        connectToSmartContract
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
