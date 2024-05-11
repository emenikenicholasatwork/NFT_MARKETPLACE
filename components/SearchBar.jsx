"use client"
import { useGlobal } from '@/global/GlobalContext'
import Image from 'next/image'
import React from 'react'

const SearchBar = () => {
    const {changeSearchState} = useGlobal()
    const cartItems = [
        {
            id: 1,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg',
            volume: 2778                               
        },{
            id: 2,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg',
            volume: 2778                                 
        },{
            id: 3,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg',
            volume: 2778                                          
        },{
            id: 4,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg',
            volume: 2778                                          
        },{
            id: 5,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg',
            volume: 2778                                          
        }
    ]
  return (
    <div className={`bg-blurBackground text-black fixed w-full h-full top-0 z-10 justify-center flex`}>
        <div className='w-full'>
            <i className='bi bi-x-lg flex justify-end p-5 text-2xl text-white cursor-pointer' onClick={changeSearchState}></i>
            <div className='items-center flex justify-center'>
                <input type="text" className='p-4 rounded-lg w-1/2 outline-none shadow-2xl' placeholder='Search Item'/>
            </div>
            <div className='flex items-center justify-center pt-10'>
                <div className='bg-white w-1/2 flex flex-col justify-center overflow-auto items-center rounded-md py-3 gap-2'>
                {
                        cartItems.map(nft=>(
                            <div className='w-full '>
                                <div className='flex flex-row items-center justify-between px-3 cursor-pointer hover:bg-gray-300' key={nft.id}>
                                    <Image className='w-16 h-16 rounded-xl' width={20} height={20} src={nft.image}/>
                                    <p className='font-bold text-sm'>{nft.name}</p>
                                    <p>{nft.floor} ETH</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchBar