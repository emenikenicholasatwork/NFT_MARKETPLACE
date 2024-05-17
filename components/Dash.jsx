import Image from 'next/image'
import React, { useState } from 'react'

const Dash = () => {
    const nfts = [
        {
            id: 1,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg'          
        },{
            id: 2,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg'            
        },{
            id: 3,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg'                     
        },{
            id: 4,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg'                     
        },{
            id: 5,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg'                     
        },{
            id: 6,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg'                     
        },{
            id: 7,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg'                     
        },{
            id: 8,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg'                     
        },{
            id: 9,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg'                     
        },
    ]
  return (
    <div className=' my-8 gap-8 flex flex-col px-2 lg:px-5'>
        <div className='flex flex-col justify-between '>
            <p className='font-extrabold text-3xl'>Trending</p>
        </div>
        <div className='flex flex-row items-center gap-3 overflow-x-auto px-2 lg:px-5'>
            {
                nfts.map(nft => (
                <div className='relative rounded-lg shadow-lg duration-300 overflow-hidden ' key={nft.id} style={{ minWidth: '300px' }}>
                    <div className='text-white absolute bottom-2 left-3'>
                        <p className='font-bold text-sm'>{nft.name}</p>
                        <p className='font-light text-sm'>Floor: {nft.floor} ETH</p>
                    </div>
                    <div style={{ minWidth: '300px' }}>
                        <Image src={nft.image} className='h-[350px] cursor-pointer shadow-md hover:scale-110 duration-300' height={100} width={300} alt='NFT dash image'/>
                    </div>                
                </div>
                ))
            }
        </div>
    </div>
  )
}

export default Dash