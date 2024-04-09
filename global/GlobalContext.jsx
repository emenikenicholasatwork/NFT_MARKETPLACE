"use client"
const {createContext, useState, useContext} = require("react")

const GlobalContext = createContext()
export function GlobalProvider({children}){
    const [isNightMode, setIsNightMode] = useState(false)
    const [isShowLogin, setIsShowLogin] = useState(false)

    const setNightMode =()=>{
        isNightMode ? setIsNightMode(false) : setIsNightMode(true)
    }
    const setLogin =()=>{
        isShowLogin ? setIsShowLogin(false) : setIsShowLogin(true)
    }
    return(
        <GlobalContext.Provider value={{
            isNightMode,
            setNightMode,
            isShowLogin,
            setLogin
        }}>{children}</GlobalContext.Provider>
    )
}

export function useGlobal(){
    return useContext(GlobalContext)
}