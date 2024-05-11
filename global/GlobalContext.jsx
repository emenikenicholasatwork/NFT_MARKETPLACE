"use client"

import SearchBar from "@/components/SearchBar"

const {createContext, useState, useContext} = require("react")

const GlobalContext = createContext()
export function GlobalProvider({children}){
    const [isNightMode, setIsNightMode] = useState(false)
    const [isShowLogin, setIsShowLogin] = useState(false)
    const [isShowCart, setIsShowCart] = useState(false)
    const [isSearchBar, setIsSearchBar] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [cartlenght, setCartLenght] = useState(0)

    const setNightMode =()=>{
        isNightMode ? setIsNightMode(false) : setIsNightMode(true)
    }
    const changeCartLenght =(length)=>{
        setCartLenght(length)
    }
    const setLogin =()=>{
        isShowLogin ? setIsShowLogin(false) : setIsShowLogin(true)
    }
    const setShowCart =()=>{
        isShowCart ? setIsShowCart(false) : setIsShowCart(true)
    }
    const changeSearchState=()=>{
        isSearchBar ?  setIsSearchBar(false) : setIsSearchBar(true)
    }
    return(
        <GlobalContext.Provider value={{
            isShowCart,
            setShowCart,
            isNightMode,
            setNightMode,
            isShowLogin,
            setLogin,
            isSearchBar,
            changeSearchState,
            isLoggedIn,
            cartlenght,
            changeCartLenght
        }}>{children}</GlobalContext.Provider>
    )
}

export function useGlobal(){
    return useContext(GlobalContext)
}