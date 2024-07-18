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
                </div>
            </div>
            <hr className='mt-6 mb-3' />
            <div className='font-light w-full flex flex-row justify-between items-center min-w-fit lg:text-lg text-sm'>
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