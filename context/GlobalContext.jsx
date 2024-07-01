"use client";

import { useRouter } from "next/navigation";

const { createContext, useState, useContext } = require("react");

const GlobalContext = createContext();
export function GlobalProvider({ children }) {
  const router = useRouter();
  const [isUserHeaderWalletInfo, setIsUserHeaderWalletInfo] = useState(false);
  const [account, setAccount] = useState("0x43Bea93563Ff08dC888bD3B0A152ef94F56D15ed");
  const [isNightMode, setIsNightMode] = useState(true);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowCart, setIsShowCart] = useState(false);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const activate_account =(account) =>{
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

  const addToCartItems = (itemId) => {
    try {
      for (const id of cartItems) {
        if (itemId === id) {
          return;
        }
      }
      setCartItems((prevItems) => [...prevItems, itemId]);
    } catch (error) {
      console.log(error);
    }
  };

  const setNightMode = () => {
    isNightMode ? setIsNightMode(false) : setIsNightMode(true);
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
        isUserHeaderWalletInfo,
        setUserHeaderWalletInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
