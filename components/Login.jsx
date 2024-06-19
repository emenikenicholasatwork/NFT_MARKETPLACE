"use client"
import { useGlobal } from '@/context/GlobalContext'
import { ethers } from 'ethers'
import {CiWallet} from 'react-icons/ci'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Web3 from 'web3'

const Login = () => {
  const [walletAddress, setWalletAddress] = useState(null)
  const notify =(message) => toast(message);
  const {isNightMode, setLogin, activate_account} = useGlobal()
  ethers.Provider
  const connect_wallet = async()=>{
    try{
      if(typeof window.ethereum !== 'undefined'){
        const account = await window.ethereum.request({method: 'eth_requestAccounts'})
        if(account.length){
          activate_account(account[0])
        }else{
          notify('No account found...')
        }
        // const provider = typeof window.ethereum !== 'undefined' ? new ethers.providers.Web3Provider(window.ethereum) : null;
        console.log(window.ethereum)
      }else {
        notify('No wallet installed. Kindly install any crypto or web3 wallet.. eg metamask..');
      };
    }catch(error){
      console.log(`Error while connecting metamask: ${error}`);
    };
  };
      
  return (
    <main className='fixed z-50 top-0 right-0 w-full h-full flex items-center justify-center bg-blurBackground font-bold'>
        <div className={`h-[450px] mb-32 w-[400px] ${isNightMode ? 'bg-black text-white' : 'bg-white text-black'} pt-10 rounded-lg shadow-md flex flex-col  relative px-2`}>
        <i className='bi bi-x-lg absolute right-7 top-7 text-lg font-extrabold cursor-pointer' onClick={setLogin}></i>
            <div className='flex flex-col items-center font-bold gap-2 mt-5'>
                <i className='bi bi-currency-bitcoin text-4xl bg-green-500 p-3 rounded-md'></i>
                <p className='text-xl font-bold'>Connect to Crypto~Art</p>
            </div>
            <div className='w-full flex flex-col items-center mt-10'>
                <ul className='bg-[#938c8c88] w-[380px] overflow-hidden flex flex-col rounded-lg shadow-xl'>
                    <li className='flex flex-row items-center p-3 gap-3 cursor-pointer hover:bg-[#9e8c8c75]' onClick={connect_wallet}>
                      <CiWallet className='text-xl'/>
                      <p>Connect Wallet</p>
                    </li>
                </ul>
            </div>
            <ToastContainer/>
            <div className='w-full flex flex-row items-center justify-between px-4 gap-3 my-5'>
                <hr className='w-full'/>
                <p>OR</p>
                <hr className='w-full'/>
            </div>
            <div className='flex flex-row items-center justify-center rounded-md p-2 bg-[#938c8c88] hover:bg-[#8f8d8dbd]'>
                <input className='p-2 bg-transparent outline-none w-[320px]' placeholder='Continue with email' type="text" name="" id="" />
                <i className='bi bi-arrow-right px-2 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700'></i>
            </div>
        </div>
    </main>
  )
}

export default Login