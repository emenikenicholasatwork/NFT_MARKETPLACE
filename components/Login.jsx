"use client"
import { useGlobal } from '../context/GlobalContext'
import {CiWallet} from 'react-icons/ci'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Login = () => {
  const [walletAddress, setWalletAddress] = useState(null)
  const {isNightMode, setLogin, activate_account} = useGlobal()
  const connect_wallet = async()=>{
    try{
      if(window.ethereum){
        const account = await window.ethereum.request({method: 'eth_requestAccounts'})
        if(account.length){
          activate_account(account[0])
          toast.success("succesfully logged in..")
        }else{
        }
      }else {
        toast.error("metamask or any web3 wallet not installed...")
      };
    }catch(error){
      console.log(`Error while connecting metamask: ${error}`);
    };
  };
      
  return (
    <main className='fixed z-50 top-0 right-0 w-full h-full flex items-center justify-center bg-blurBackground font-bold'>
        <div className={`h-[450px] mb-32 w-[400px] ${isNightMode ? 'bg-[#1c1f1d] text-white' : 'bg-white text-black'} pt-10 rounded-lg shadow-md flex flex-col  relative px-2`}>
        <i className='bi bi-x-lg absolute right-7 top-7 text-lg font-extrabold cursor-pointer' onClick={setLogin}></i>
            <div className='flex flex-col items-center font-bold gap-2 mt-5'>
                <i className='bi bi-currency-bitcoin text-4xl bg-green-500 p-3 rounded-md'></i>
                <p className='text-xl font-bold'>Connect to Crypto~Art</p>
            </div>
            <div className='w-full flex bg-[#938c8c88] flex-row p-3 cursor-pointer overflow-hidden shadow-lg gap-2 rounded-lg hover:bg-[#9e8c8c75] items-center mt-10' onClick={connect_wallet}>
              <CiWallet className='text-2xl'/>
              <p>Connect Wallet</p>
            </div>
            <div className='w-full flex flex-row items-center justify-between px-4 gap-3 my-5'>
                <hr className='w-full'/>
                <p>OR</p>
                <hr className='w-full'/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="email">continue with email</label>
              <div className='flex flex-row items-center justify-center rounded-md p-2 bg-[#938c8c88] hover:bg-[#8f8d8dbd]'>
                <input className='p-2 bg-transparent outline-none w-[320px]' placeholder='Continue with email' type="text" name="email" id="" />
                <i className='bi bi-arrow-right px-2 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700'></i>
              </div>
            </div>
        </div>
    </main>
  )
}

export default Login