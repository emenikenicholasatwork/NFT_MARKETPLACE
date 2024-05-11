import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-blue-700 min-h-fit px-10 z-20 pt-10 text-white'>
        <div className='flex lg:gap-36 lg:flex-row flex-col items-center w-full'>
        <div className='flex lg:flex-row gap-5 lg:gap-0 flex-col '>
            <div className='flex flex-col gap-2 items-center lg:items-start flex-1'>
                <i className="bi bi-currency-bitcoin text-3xl bg-green-500 p-2 rounded-md flex w-12"></i>
                <p className='font-bold'>Cryto~Art</p>
            </div>
        </div>
            <div className='flex-1 flex flex-col gap-3'>
                    <p className='text-sm'>Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating Crypto~Art</p>
                <div className='items-center flex flex-row gap-2'>
                    <input type="text" className='p-2 rounded-lg flex-1 outline-none text-black' placeholder='Your email address'/>
                    <button className='lg:px-5 p-3 lg:py-2 bg-blue-500 rounded-lg hover:bg-blue-900 duration-200'>Sign up</button>
                </div>
            </div>
            <div className='flex-1 gap-2 flex flex-col items-center'>
                <p className='font-bold'>Join the community</p>
                <div className='flex flex-row gap-3 flex-wrap'>
                    <i className='bi bi-twitter bg-blue-500 p-3 rounded-lg cursor-pointer hover:bg-blue-900 duration-200'></i>
                    <i className='bi bi-instagram bg-blue-500 p-3 rounded-lg cursor-pointer hover:bg-blue-900 duration-200'></i>
                    <i className='bi bi-discord bg-blue-500 p-3 rounded-lg cursor-pointer hover:bg-blue-900 duration-200'></i>
                    <i className='bi bi-whatsapp bg-blue-500 p-3 rounded-lg cursor-pointer hover:bg-blue-900 duration-200'></i>
                    <i className='bi bi-youtube bg-blue-500 p-3 rounded-lg cursor-pointer hover:bg-blue-900 duration-200'></i>
                    <i className='bi bi-tiktok bg-blue-500 p-3 rounded-lg cursor-pointer hover:bg-blue-900 duration-200'></i>
                    <i className='bi bi-envelope-at bg-blue-500 p-3 rounded-lg cursor-pointer hover:bg-blue-900 duration-200'></i>
                </div>
            </div>
        </div>
        <hr className='mt-6 mb-3'/>
        <div className='font-light w-full flex flex-row justify-between items-center min-w-fit'>
            <p>Copyright &copy; 2024 by Nicholas || All Right Reserved.</p>
            <div className='flex flex-row gap-5'>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer