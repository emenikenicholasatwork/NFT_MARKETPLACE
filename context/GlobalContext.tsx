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

interface GlobalContextProps {
  isNightMode: boolean;
  setNightMode: () => void;
  isWalletConnected: boolean;
  account: string;
  activate_account: (account: string) => void;
  logout: () => void;
  login: () => void;
  signer: any
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const router = useRouter();
  const [account, setAccount] = useState("0x43Bea93563Ff08dC888bD3B0A152ef94F56D15ed");
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isNightMode, setIsNightMode] = useState(true);
  const [signer, setSigner] = useState(null);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const nightMode = retrieveCookie("crypto~art: dark theme");
    setIsNightMode(nightMode === "enabled");
    setSigner(retrieveCookie("crypto~art: signer"));
    const logout = retrieveCookie("crypto~art: logout");
    if (logout) {
      logout === "true" ? setIsWalletConnected(false) : setIsWalletConnected(true);
    }

  }, []);

  const activate_account = (account: string) => {
    setIsWalletConnected(true);
    setAccount(account);
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
        activate_account(account[0]);
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

  const changeSearchState = () => {
    isSearchBar ? setIsSearchBar(false) : setIsSearchBar(true);
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
        signer
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
