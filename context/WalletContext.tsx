import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";
import NftMarketplace from "../bin/contracts/NFTMarketplace.json";
import { createContext, ReactNode, useContext } from "react";
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_API_KEY}`);

interface WalletContextProp {

}


const WalletContext = createContext<WalletContextProp | undefined>(undefined);


interface WalletProviderProps {
    children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const connectToSmartContract = () => {
        const contract = new ethers.Contract(NftMarketplace.address, NftMarketplace.abi, provider);
    }
    return (
        <WalletContext.Provider value={{
            connectToSmartContract,
        }}>{children}</WalletContext.Provider>
    );
};

export function useWallet(): WalletContextProp {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within the WalletProvider");
    }
    return useWallet(WalletContext);
}