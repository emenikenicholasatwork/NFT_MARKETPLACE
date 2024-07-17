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
  findNftById,
  saveNftChange,
  retrieveCookie,
  saveCookie,
  deleteCookie,
} from "../utils/Utils";
import { toast } from "react-hot-toast";
import { BrowserProvider } from "ethers";

interface GlobalContextProps {
  isShowCart: boolean;
  setShowCart: () => void;
  isNightMode: boolean;
  setNightMode: () => void;
  isSearchBar: boolean;
  changeSearchState: () => void;
  isWalletConnected: boolean;
  cartItems: string[];
  clearCartItems: () => void;
  account: string;
  activate_account: (account: string) => void;
  addToCartItems: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  logout: () => void;
  login: () => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const notifyAdd = () => toast.success("Added to cart");
  const notifyRemove = () => toast.success("Removed from cart");
  const router = useRouter();
  const [account, setAccount] = useState(
    "0x43Bea93563Ff08dC888bD3B0A152ef94F56D15ed"
  );
  const [isShowCart, setIsShowCart] = useState(false);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [isNightMode, setIsNightMode] = useState(true);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const nightMode = retrieveCookie("crypto~art: dark theme");
    setIsNightMode(nightMode === "enabled");
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

  const addToCartItems = (itemId: string) => {
    try {
      for (const id of cartItems) {
        if (itemId === id) {
          removeFromCart(itemId);
          return;
        }
      }
      setCartItems((prevItems) => [...prevItems, itemId]);
      notifyAdd();
      const nft = findNftById(itemId);
      nft.inCart = true;
      saveNftChange(nft);
    } catch (error) {
      console.log(error);
    }
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

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item !== itemId));
    notifyRemove();
    const nft = findNftById(itemId);
    nft.inCart = false;
    saveNftChange(nft);
  };

  const clearCartItems = () => {
    setCartItems([]);
  };

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
  const setShowCart = () => {
    isShowCart ? setIsShowCart(false) : setIsShowCart(true);
  };
  const changeSearchState = () => {
    isSearchBar ? setIsSearchBar(false) : setIsSearchBar(true);
  };
  return (
    <GlobalContext.Provider
      value={{
        isShowCart,
        setShowCart,
        isNightMode,
        setNightMode,
        isSearchBar,
        changeSearchState,
        isWalletConnected,
        cartItems,
        account,
        activate_account,
        addToCartItems,
        removeFromCart,
        clearCartItems,
        logout,
        login,
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
