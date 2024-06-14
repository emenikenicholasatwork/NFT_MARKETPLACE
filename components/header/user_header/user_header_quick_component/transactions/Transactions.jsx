import { useGlobal } from "@/context/GlobalContext";
import { FaInfinity } from "react-icons/fa6";
import { IoChevronDownOutline } from "react-icons/io5";

const Transactions = () => {
  const { isNightMode } = useGlobal();
  return (
    <div className="flex flex-col">
      <div className="flex flex-row py-3 px-2 justify-between">
        <div className="flex flex-row gap-1 items-center hover:bg-gray-400 p-2 rounded-md duration-100 hover:text-white">
          <img
            src="/icons/metamask.svg"
            className=""
            height={20}
            width={30}
            alt="MetaMask Icon"
          />
          <p>0x43be...15ed</p>
        </div>
        <div className="flex flex-row items-center gap-2 text-lg hover:bg-gray-500 rounded-md p-2 hover:text-white duration-200">
          <FaInfinity />
          <IoChevronDownOutline />
        </div>
      </div>
      <div
        className={`flex flex-col h-full px-2 bg-gray-200 rounded-t-3xl pt-3 ${
          isNightMode && "bg-slate-700"
        }`}
      >
        <h1 className="text-2xl">Transactions</h1>
        <div className="h-80 w-full"></div>
      </div>
    </div>
  );
};
export default Transactions;
