import { useGlobal } from "../../../context/GlobalContext"


const Notification: React.FC = () => {
    const { account } = useGlobal();
    const first_slice = account.slice(0, 6);
    const second_slice = account.slice(38, 42);
  return (
    <div>
        <h1 className="font-bold text-3xl">Notification settings</h1>
        <div>
            <p>Select which notification you would like to recieve for {first_slice+"..."+second_slice}</p>
            <div className="w-[700px] border border-gray-400 flex flex-col rounded-lg">
                <div className="flex flex-row w-full p-5 gap-5">
                    <input type="checkbox" style={{width: '20px', height: '20px'}}/>
                    <div className="flex flex-col items-start">
                        <p className="font-bold text-lg">Item Sold</p>
                        <p>when someone purchase one of your items</p>
                    </div>
                </div>
                <hr />
                <div className="flex flex-row w-full p-5 gap-5">
                    <input type="checkbox" style={{width: '20px', height: '20px'}}/>
                    <div className="flex flex-col items-start">
                        <p className="font-bold text-lg">Successfull Purchase</p>
                        <p>when you successfully buy an item</p>
                    </div>
                </div>
                <hr />
                <div className="flex flex-row w-full p-5 gap-5">
                    <input type="checkbox" style={{width: '20px', height: '20px'}}/>
                    <div className="flex flex-col items-start">
                        <p className="font-bold text-lg">Successfull Mint</p>
                        <p>when you successfully mint an item</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Notification