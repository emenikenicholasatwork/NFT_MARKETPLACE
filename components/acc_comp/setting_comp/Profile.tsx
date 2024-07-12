import { MdCopyAll } from "react-icons/md";
import { SlGlobe } from "react-icons/sl";
import { useGlobal } from "../../../context/GlobalContext";
import { MoonLoader } from "react-spinners";
import { useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";

const Profile: React.FC = () => {
    const [image1, setImage1] = useState<string | null>(null);
    const [image2, setImage2] = useState<string | null>(null);
    const [image1Loading, setImage1Loading] = useState<boolean>(false);
    const [image2Loading, setImage2Loading] = useState<boolean>(false);
    const image1Ref = useRef<HTMLInputElement>(null);
    const image2Ref = useRef<HTMLInputElement>(null);
    const { account } = useGlobal();
    const first_slice = account.slice(0, 6);
    const second_slice = account.slice(38, 42);

    const handleImage1Change = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const file = e.target.files?.[0];
        if (file) {
            setImage1Loading(true);
            const reader = new FileReader();
            reader.onloadend =()=>{
                setImage1(reader.result as string);
                setImage1Loading(false);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleImage2Change =(e: React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(file){
            setImage2Loading(true);
            const reader = new FileReader();
            reader.onloadend=()=>{
                setImage2(reader.result as string);
                setImage2Loading(false);
            };
            reader.readAsDataURL(file);
        }
    }

  return (
    <div className="flex flex-col gap-10">
        <h1 className="font-bold text-3xl">Profile details</h1>
        <div className="flex flex-row w-full gap-10">
            <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col gap-2 w-96">
                    <p className="text-lg">username</p>
                    <input type="text" className="bg-transparent border-gray-500 border p-3 rounded-xl" placeholder="Enter username"/>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-lg">Bio</p>
                    <textarea className="bg-transparent border-gray-500 border p-3 rounded-xl" placeholder="Tell the world your story!"></textarea>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-lg">Email Address</p>
                    <input type="text" placeholder="Enter email" className="bg-transparent border-gray-500 border p-3 rounded-xl" />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Links</p>
                    <div className="flex flex-row items-center border  border-gray-500 p-3 rounded-xl gap-3">
                        <SlGlobe/>
                        <input type="text" placeholder="yoursite.io" className="outline-none bg-transparent" />
                    </div>
                </div>
                <div data-tooltip-id="address-copy-tooltip" data-tooltip-content="Copy" onClick={()=>
                    navigator.clipboard.writeText(account).then(()=>{
                        toast.success("Copied")
                    })
                }>
                    <Tooltip id="address-copy-tooltip"/>
                    <p className="text-lg">Wallet Address</p>
                    <div className="cursor-pointer flex flex-row items-center gap-1 text-lg">
                        <p>{`${first_slice}...${second_slice}`}</p>
                        <MdCopyAll/>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-16">
                <div className="flex flex-col gap-3">
                    <p className="text-center font-bold text-lg">Profile Image</p> 
                    <div onClick={() => { if (image1Ref.current) image1Ref.current.click(); }} className="cursor-pointer relative w-52 h-52">
                    <div className="z-10 flex items-center justify-center w-52 h-52 rounded-full">
                        {image1Loading ? (<MoonLoader color="#e5cbcb" />) : (<img src={image1 || '/images/default-profile.png'} alt="Profile" className="w-52 h-52 rounded-full object-cover"/>)}
                    </div>
                    <input type="file" accept=".png, .svg, .gif, .jpg, .jpeg, image/png, image/svg+xml, image/gif, image/jpeg"  ref={image1Ref} className="hidden" onChange={handleImage1Change} />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-center font-bold text-lg">Profile Cover Banner</p> 
                    <div onClick={() => { if (image2Ref.current) image2Ref.current.click(); }} className="cursor-pointer relative w-52 h-52">
                    <div className="z-10 flex items-center justify-center w-52 h-52 rounded-full">
                        {image2Loading ? (<MoonLoader color="#e5cbcb" />) : (<img src={image2 || '/images/default-profile.png'} alt="Profile" className="w-52 h-52 rounded-full object-cover"/>)}
                    </div>
                    <input type="file" accept=".png, .svg, .gif, .jpg, .jpeg, image/png, image/svg+xml, image/gif, image/jpeg"  ref={image2Ref} className="hidden" onChange={handleImage2Change} />
                    </div>
                </div>
            </div>
        </div>
        <button className="flex items-start bg-blue-500 justify-center rounded-xl w-28 p-5 hover:scale-105 duration-200">Save</button>
    </div>
  )
}
export default Profile