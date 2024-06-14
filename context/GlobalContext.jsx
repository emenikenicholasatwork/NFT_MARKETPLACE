"use client";

import SearchBar from "@/components/SearchBar";

const { createContext, useState, useContext } = require("react");

const GlobalContext = createContext();
export function GlobalProvider({ children }) {
  const [isNightMode, setIsNightMode] = useState(false);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowCart, setIsShowCart] = useState(false);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCartItems = (itemId) => {
    const itemExists = cartItems.some((cartItem) => cartItem.id === itemId);
    if (!itemExists) {
      setCartItems((prevItems) => [...prevItems, itemId]);
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
