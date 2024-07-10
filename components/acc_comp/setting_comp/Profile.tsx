import { MdCopyAll } from "react-icons/md";
import { SlGlobe } from "react-icons/sl";
import { useGlobal } from "../../../context/GlobalContext";
import { LuInfo } from "react-icons/lu";
import { useRef, useState } from "react";
import { FaPencil } from "react-icons/fa6";

const Profile: React.FC = () => {
    const [image1, setImage1] = useState<string | ArrayBuffer | null>(null);
    const [image2, setImage2] = useState<string | ArrayBuffer | null>(null);
    const [image1Empty, setImage1Empty] = useState<boolean>(true);
    const [image2Empty, setImage2Empty] = useState<boolean>(true);
    const image1Ref = useRef<HTMLInputElement>(null);
    const image2Ref = useRef<HTMLInputElement>(null);
    const { account } = useGlobal();
    const first_slice = account.slice(0, 6);
    const second_slice = account.slice(38, 42);

    const handleImage1Change = () =>{
        if(image1Ref.current && image1Ref.current.files){
            const file = image1Ref.current.files[0];
            if(file){
                const reader = new FileReader();
                reader.onload = () =>{
                    setImage1(reader.result);
                    setImage1Empty(false);
                };
                reader.readAsDataURL(file);
            }
        }
    }

    const handleImage2Change =()=>{
        if(image2Ref.current && image2Ref.current.files[0]){
            const file = image2Ref.current.files[0];
            if(file){
                const reader = new FileReader();
                reader.onload =()=>{
                    setImage2(reader.result);
                    setImage2Empty(false);
                };
                reader.readAsDataURL(file);
            }
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
                <div>
                    <p>Links</p>
                    <div className="flex flex-row items-center border  border-gray-500 p-3 rounded-xl gap-3">
                        <SlGlobe/>
                        <input type="text" placeholder="yoursite.io" className="outline-none bg-transparent" />
                    </div>
                </div>
                <div>
                    <p className="text-lg">Wallet Address</p>
                    <div className="cursor-pointer flex flex-row items-center gap-1 text-lg">
                        <p>{`${first_slice}...${second_slice}`}</p>
                        <MdCopyAll/>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-10">
                <div className="flex flex-col gap-1">
                    <p>Profile Image</p> 
                    <div onClick={()=>{if(image1Ref){image1Ref.current.click();}}}>
                        {
                            image1Empty ? 
                            <div className="bg-[#686666] flex items-center justify-center w-52 h-52 cursor-pointer rounded-full">
                                <FaPencil/>
                            </div> :
                            <img src={typeof image1 === 'string' ? image1 : ''} className="w-52 h-52 rounded-full" height={100} width={100}/>
                        }
                        <input type="file" ref={image1Ref} className="hidden" onChange={handleImage1Change} />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <p>Profile Banner</p>
                    <div onClick={()=> {if(image2Ref){image2Ref.current.click();}}}>
                        {
                        image1Empty ? 
                        <div className="bg-[#686666] flex items-center justify-center w-52 h-52 cursor-pointer rounded-full">
                            <FaPencil/>
                        </div> :
                        <img src={typeof image2 === 'string' ? image2 : ''} className="w-52 h-52 rounded-full" height={100} width={100}/>
                        }
                        <input type="file" ref={image2Ref} className="hidden" onChange={handleImage2Change} />
                    </div>
                </div>
            </div>
        </div>
        <button className="flex items-start bg-blue-500 justify-center rounded-xl w-28 p-5 hover:scale-105 duration-200">Save</button>
    </div>
  )
}
export default Profile