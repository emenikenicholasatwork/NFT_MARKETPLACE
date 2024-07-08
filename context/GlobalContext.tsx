"use client";

import { useRouter } from "next/navigation";
import React, {useContext, createContext, useState, ReactNode, useEffect} from "react";
import { retrieveCookie, saveCookie } from "../utils/cookieUtils";
import { toast } from "react-toastify";

interface GlobalContextProps {
  isShowCart: boolean;
  setShowCart: () => void;
  isNightMode: boolean;
  setNightMode: () => void;
  isShowLogin: boolean;
  setLogin: () => void;
  isSearchBar: boolean;
  changeSearchState: () => void;
  isLoggedIn: boolean;
  cartItems: string[];
  clearCartItems: () => void;
  account: string;
  activate_account: (account: string) => void;
  addToCartItems: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  isUserHeaderWalletInfo: boolean;
  setUserHeaderWalletInfo: () => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) =>{
  const notifyAdd = ()=> toast('Added to cart');
  const notifyRemove = ()=> toast('Removed from cart');
  const router = useRouter();
  const [isUserHeaderWalletInfo, setIsUserHeaderWalletInfo] = useState(false);
  const [account, setAccount] = useState("0x43Bea93563Ff08dC888bD3B0A152ef94F56D15ed");
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowCart, setIsShowCart] = useState(false);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [isNightMode, setIsNightMode] = useState(true);


  useEffect(()=>{
    const nightMode = retrieveCookie('nightMode');
    setIsNightMode(nightMode === 'enabled');
  },[])

  const activate_account =(account: string) =>{
    setAccount(account);
    setIsLoggedIn(true);
    setIsShowLogin(false);
    router.push("/user");
  };

  const setUserHeaderWalletInfo = () => {
    isUserHeaderWalletInfo
      ? setIsUserHeaderWalletInfo(false)
      : setIsUserHeaderWalletInfo(true);
  };

  const addToCartItems = (itemId: string) => {
    try {
      for (const id of cartItems) {
        if (itemId === id) {
          return;
        }
      }
      setCartItems((prevItems) => [...prevItems, itemId]);
      notifyAdd();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart =(itemId: string)=>{
    setCartItems(cartItems.filter(item => item !== itemId));
    notifyRemove();
  }

  const clearCartItems =()=>{
    setCartItems([]);
  }

  const setNightMode = () => {
    const newNightMode = !isNightMode;
    setIsNightMode(newNightMode);
    saveCookie('nightMode', newNightMode ? 'enabled' : 'disabled', 7)
  };
  const setLogin = () => {
    isShowLogin ? setIsShowLogin(false) : setIsShowLogin(true);
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
        isShowLogin,
        setLogin,
        isSearchBar,
        changeSearchState,
        isLoggedIn,
        cartItems,
        account,
        activate_account,
        addToCartItems,
        removeFromCart,
        clearCartItems,
        isUserHeaderWalletInfo,
        setUserHeaderWalletInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal(): GlobalContextProps {
  const context = useContext(GlobalContext);
  if(!context){
    throw new Error("useGlobal must be used within a GlobalProvider")
  }
  return useContext(GlobalContext);
}
