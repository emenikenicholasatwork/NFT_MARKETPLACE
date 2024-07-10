import { IoChevronDownOutline } from "react-icons/io5";
import { FaEthereum } from "react-icons/fa6";
import { SiSolana } from "react-icons/si";
import { useGlobal } from "../../../../context/GlobalContext";
import { IoMdClose } from "react-icons/io";

const Swap = () => {
  const { isNightMode, setUserHeaderWalletInfo } = useGlobal();
  return (
    <div className="flex flex-col p-3 gap-5 h-[434.73px]">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl">Swap</h1>
        <div
          className="flex flex-row items-center gap-2 cursor-pointer text-lg hover:bg-gray-500 rounded-md p-2 hover:text-white duration-200"
          onClick={() => setUserHeaderWalletInfo()}
        >
          <IoMdClose />
        </div>
      </div>
      <div className="flex flex-col gap-3 relative">
        <div
          className={`bg-slate-300 p-3 rounded-md ${
            isNightMode && "bg-slate-700"
          }`}
        >
          <div className="flex justify-between">
            <div className="flex flex-row items-center gap-2">
              <FaEthereum />
              <p>Ethereum</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>Polygon</p>
              <IoChevronDownOutline />
            </div>
          </div>
          <hr className="my-3" />
          <div>
            <input
              className="p-2 text-2xl my-3 w-full h-10 bg-transparent outline-none"
              placeholder="1-10000000000"
              type="text"
            />
          </div>
        </div>
        <div
          className={`bg-slate-300 p-3 rounded-md ${
            isNightMode && "bg-slate-700"
          }`}
        >
          <div className="flex justify-between">
            <div className="flex flex-row items-center gap-2">
              <SiSolana />
              <p>Solana</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>Polygon</p>
              <IoChevronDownOutline />
            </div>
          </div>
          <hr className="my-3" />
          <div>
            <input
              className="p-2 text-2xl my-3 w-full h-10 bg-transparent outline-none"
              placeholder="1-10000000000"
              type="text"
            />
          </div>
        </div>
        <div
          className={`absolute flex top-1/2 left-1/2 bg-slate-700 rounded-3xl p-2 ${
            isNightMode && "bg-white"
          }`}
        >
          <IoChevronDownOutline
            className={`cursor-pointer ${isNightMode ? "text-black" : "text-white"}`}
          />
        </div>
      </div>
      <button className="bg-blue-600 rounded-md p-3 text-white">Review</button>
    </div>
  );
};
export default Swap;
