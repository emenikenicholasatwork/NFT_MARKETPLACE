import { IoChevronDownOutline } from "react-icons/io5";
import styles from "./swap.module.css";
import { FaEthereum } from "react-icons/fa6";
import { SiSolana } from "react-icons/si";

const Swap = () => {
  return (
    <div className="flex flex-col p-3 gap-5">
      <h1 className="text-2xl">Swap</h1>
      <div className="flex flex-col gap-3 relative">
        <div className="bg-slate-300 p-3 rounded-md">
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
        <div className="bg-slate-300 rounded-md p-3">
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
        <div className="absolute flex top-1/2 left-1/2 bg-slate-700 rounded-3xl p-2">
          <IoChevronDownOutline className="text-white" />
        </div>
      </div>
      <button className="bg-blue-600 rounded-md p-3 text-white">Review</button>
    </div>
  );
};
export default Swap;
