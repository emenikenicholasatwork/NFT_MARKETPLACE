"use client"
import Image from 'next/image';
import React, { useState } from 'react'

const Top = () => {
    const nfts = [
        {
          id: 1,
          name: 'Ape Mutan ',
          floor_price: 0.27,
          volume: 203.9,
          image: '/images/ape1.jpg',
          
        },{
          id: 2,
          name: 'Ape Mutan ',
          floor_price: 0.27,
          volume: 203.9,
          image: '/images/ape1.jpg',
          
        },{
          id: 3,
          name: 'Ape Mutan ',
          floor_price: 0.27,
          volume: 203.9,
          image: '/images/ape1.jpg',
        },{
          id: 4,
          name: 'Ape Mutan ',
          floor_price: 0.27,
          volume: 203.9,
          image: '/images/ape1.jpg',
        },{
          id: 5,
          name: 'Ape Mutan ',
          floor_price: 0.27,
          volume: 203.9,
          image: '/images/ape1.jpg',
          
        },{
            id: 6,
            name: 'Ape Mutan ',
            floor_price: 0.27,
            volume: 203.9,
            image: '/images/ape1.jpg',
          },{
            id: 7,
            name: 'Ape Mutan ',
            floor_price: 0.27,
            volume: 203.9,
            image: '/images/ape1.jpg',
          },{
            id: 8,
            name: 'Ape Mutan ',
            floor_price: 0.27,
            volume: 203.9,
            image: '/images/ape1.jpg',
          },{
            id: 9,
            name: 'Ape Mutan ',
            floor_price: 0.27,
            volume: 203.9,
            image: '/images/ape1.jpg',
          },{
            id: 10,
            name: 'Ape Mutan ',
            floor_price: 0.27,
            volume: 203.9,
            image: '/images/ape1.jpg',
          },
      ];
      // Split the nft array into two separate arrays
  const firstHalf = nfts.slice(0, Math.ceil(nfts.length / 2));
  const secondHalf = nfts.slice(Math.ceil(nfts.length / 2));
  return (
    <div className='w-full px-5 lg:px-16 text-sm lg:text-md'>
      <div className='flex flex-row items-center justify-between'>
        <div className='items-center gap-2'>
          <p className='font-extrabold text-3xl mt-5'>Top Ratings..</p>
        </div>
      </div>
      <div className='flex flex-row gap-20 mt-5 overflow-auto'>
        <div className='flex-1 min-w-fit'>
            <div className='flex flex-row font-thin'>
            <div className='lg:flex-[.4] flex-[.3]'>
                    <span className='hidden lg:block'>Rank</span>
                    <span className='block lg:hidden'>#</span>
                </div>
                <div className='flex-[3]'>
                    <span>Collection</span>
                </div>
                <div className='flex-[.9] min-w-fit'>
                    <span>Floor Price</span>
                </div>
            </div>
            <hr className='border-1 border-gray-500'/>
            <div className='mt-3'>
                {
                    firstHalf.map(nft => (
                        <div key={nft.id} className='flex-row flex items-center cursor-pointer hover:bg-[#9e8c8c25] p-2 rounded-lg relative'>
                            <div className=' me-[20px]'>
                                <span>{nft.id}</span>
                            </div>
                            <div className='flex flex-row items-center gap-2 flex-[3] me-5'>
                              <Image src={nft.image} className='rounded-lg' width={70} height={20} alt="nft image"/>
                                <span className='min-w-fit'>{nft.name}</span>
                            </div>
                            <div className='flex-[.9] min-w-fit'>
                                <span>{nft.floor_price} ETH</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='flex-1 min-w-fit'>
            <div className='flex flex-row font-thin'>
                <div className='lg:flex-[.4] flex-[.3]'>
                    <span className='hidden lg:block'>Rank</span>
                    <span className='block lg:hidden'>#</span>
                </div>
                <div className='flex-[3]'>
                    <span>Collection</span>
                </div>
                <div className='flex-[.9] min-w-fit'>
                    <span>Floor Price</span>
                </div>
            </div>
            <hr className='border-1 border-gray-500'/>
            <div className='mt-3'>
                {
                    secondHalf.map(nft => (
                        <div key={nft.id} className='flex-row flex items-center cursor-pointer hover:bg-[#9e8c8c25] p-2 rounded-lg relative'>
                            <div className=' me-[20px]'>
                                <span>{nft.id}</span>
                            </div>
                            <div className='flex flex-row items-center gap-2 flex-[3] me-5'>
                              <Image src={nft.image} className='rounded-lg' width={70} height={20} alt="nft image"/>
                                <span className='min-w-fit'>{nft.name}</span>
                            </div>
                            <div className='flex-[.9] min-w-fit'>
                                <span>{nft.floor_price} ETH</span>
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

export default Top