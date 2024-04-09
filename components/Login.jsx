"use client"
import { useGlobal } from '@/global/GlobalContext'
import React from 'react'

const Login = () => {
    const {isNightMode, setLogin} = useGlobal()
    const connect_wallet= async (account)=>{
        try{
            let provider;
           
        }catch(error){
            console.log('Error connecting to wallet: ', error.message)
        }
    }
  return (
    <main className='fixed z-20 top-0 right-0 w-full h-full flex items-center justify-center bg-blurBackground font-bold'>
        <div className={`h-[550px] mb-32 w-[400px] ${isNightMode ? 'bg-[#645e5e88] text-white' : 'bg-white text-black'} pt-10 rounded-lg shadow-md flex flex-col  relative px-2`}>
        <i className='bi bi-x-lg absolute right-7 top-7 text-lg font-extrabold cursor-pointer' onClick={setLogin}></i>
            <div className='flex flex-col items-center font-bold gap-2 mt-5'>
                <i className='bi bi-currency-bitcoin text-4xl bg-green-500 p-3 rounded-md'></i>
                <p className='text-xl font-bold'>Connect to Crypto~Art</p>
            </div>
            <div className='w-full flex flex-col items-center mt-10'>
                <ul className='bg-[#938c8c88] w-[380px] overflow-hidden flex flex-col rounded-lg shadow-xl'>
                    <li className='flex flex-row items-center p-3 gap-3 cursor-pointer hover:bg-[#504e4eee]' onClick={()=>{
                        connect_wallet('metamask')
                        }}>
                        <img src="/icons/metamask.svg" height={20} width={30} alt="MetaMask Icon" />
                        <p>MetaMask</p>
                    </li>
                    <hr className='w-[380px]'/>
                    <li className='flex flex-row items-center p-3 gap-3 cursor-pointer hover:bg-[#504e4eee]' onClick={connect_wallet('')}>
                        <img src="/icons/Phantom-Icon_App.svg" height={20} width={30} alt="Phantom Icon" />
                        <p>Phantom</p>
                    </li>
                    <hr className='w-[380px]'/>
                    <li className='flex flex-row items-center p-3 gap-3 cursor-pointer hover:bg-[#504e4eee]' onClick={connect_wallet('')}>
                        <img src="/icons/coinbase.svg" height={20} width={30} alt="Phantom Icon" />
                        <p>Coinbase Wallet</p>
                    </li>
                </ul>
                <p className='justify-center flex font-normal text-sm cursor-pointer mt-5'>More wallet options</p>
            </div>
            <div className='w-full flex flex-row items-center justify-between px-4 gap-3 my-5'>
                <hr className='w-full'/>
                <p>OR</p>
                <hr className='w-full'/>
            </div>
            <div className='flex flex-row items-center justify-center rounded-md p-2 bg-[#938c8c88] '>
                <input className='p-2 bg-transparent outline-none w-[320px]' placeholder='Continue with email' type="text" name="" id="" />
                <i className='bi bi-arrow-right px-2 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700'></i>
            </div>
        </div>
    </main>
  )
}

export default Login