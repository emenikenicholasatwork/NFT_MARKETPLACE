import { useGlobal } from "../../../../../context/GlobalContext";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

const Crypto = () => {
  const { isNightMode, setUserHeaderWalletInfo, account } = useGlobal();
  const first_6 = account.slice(0, 6);
  const last_4 = account.slice(38, 42);
  return (
    <div className="h-[434.73px]">
      <div className="p-3 gap-5 flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-1 items-center cursor-pointer hover:bg-gray-400 p-2 rounded-md duration-100 hover:text-white">
            <img src="/icons/metamask.svg" height={20} width={30} alt="MetaMask Icon"/>
            <p>{`${first_6}...${last_4}`}</p>
          </div>
          <div className="flex flex-row items-center cursor-pointer gap-2 text-lg hover:bg-gray-500 rounded-md p-2 hover:text-white duration-200" onClick={() => setUserHeaderWalletInfo()}>
            <IoMdClose />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div>
            <p className="text-3xl">$0.00 USD</p>
            <p className="">wallet balance</p>
          </div>
          <div className="bg-neutral-400 w-12 h-12 rounded-md cursor-pointer hover:bg-neutral-500 duration-300 ease flex items-center justify-center">
            <p className="text-white text-5xl font-thin">+</p>
          </div>
        </div>
      </div>
      <div className={`${isNightMode ? "bg[#192f37]" : "bg-gray-200"} h-72 pt-5 rounded-t-3xl`}>
        <div className="flex flex-col justify-center items-center gap-2">
          <Image alt="wallet icon" className="w-24 h-24" src={"/icons/wallet.png"} height={500} width={500}/>
          <p className="w-36">Fund your wallet to purchase NFTs</p>
          <button className="bg-blue-500 hover:scale-105 duration-300 text-white p-3 rounded-md">
            Add funds with card
          </button>
        </div>
      </div>
    </div>
  );
};
export default Crypto;
