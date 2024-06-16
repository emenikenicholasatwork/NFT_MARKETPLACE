"use client";

import SearchBar from "@/components/SearchBar";

const { createContext, useState, useContext } = require("react");

const GlobalContext = createContext();
export function GlobalProvider({ children }) {
  const [isUserHeaderWalletInfo, setIsUserHeaderWalletInfo] = useState();

  const [isNightMode, setIsNightMode] = useState(false);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowCart, setIsShowCart] = useState(false);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cartItems, setCartItems] = useState([]);

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
