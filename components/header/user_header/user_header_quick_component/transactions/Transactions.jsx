import { FaInfinity } from "react-icons/fa6";
import { IoChevronDownOutline } from "react-icons/io5";

const Transactions = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
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
      <div className="flex flex-col">
        <h1>Transactions</h1>
        <div className=""></div>
      </div>
    </div>
  );
};
export default Transactions;
