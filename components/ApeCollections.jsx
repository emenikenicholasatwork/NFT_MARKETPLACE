import { useGlobal } from '@/context/GlobalContext'
import Image from 'next/image'
import React from 'react'

const ApeCollections = () => {
    const {isNightMode} = useGlobal()
    const nfts = [
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
        },{
            id: 6,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg',
            volume: 2778                                          
        },{
            id: 7,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg',
            volume: 2778                     
        },{
            id: 8,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg',
            volume: 2778                                          
        },{
            id: 9,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/image1.jpg',
            volume: 2778                                          
        },
    ]
    const firstSixNfts = nfts.slice(0, 6)
  return (
    <div className=' flex flex-col min-h-fit py-5 px-5 lg:px-20 gap-3'>
        <div className='flex flex-col justify-between '>
            <p className='font-bold text-lg'>Ape Collections</p>
        </div>
        <div className='flex gap-3 flex-row items-center overflow-x-auto p-3'>
            {
                firstSixNfts.map(nft=>(
                <div key={nft.id} className={`rounded-lg overflow-hidden hover:-translate-y-1 min-w-fit cursor-pointer duration-200 shadow-md hover:shadow-2xl ${isNightMode ? 'bg-[#9e8c8c15]' : ''} `}>
                    <Image src={nft.image} className='w-[200px] h-[200px]' height={90} width={50}/>
                    <div className='items-center flex flex-col'>
                        <p className='p-3 text-sm'>{nft.name}</p>
                        <div className='flex w-full flex-row justify-between p-3'>
                            <div>
                                <p className='font-light text-sm'>Floor</p>
                                <p className='text-sm'>{nft.floor} ETH</p>
                            </div>
                            <div>
                                <p className='font-light text-sm'>Total volume</p>
                                <p className='text-sm'>{nft.volume} ETH</p>
                            </div>
                        </div>
                    </div>
                </div>
                ))
            }
        </div>
    </div>
  )
}

export default ApeCollections