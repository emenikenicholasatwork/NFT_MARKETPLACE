import { useGlobal } from '@/context/GlobalContext'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AnimeCollection = () => {
    const {isNightMode} = useGlobal()
    const nfts = [
        {
            id: 1,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/nft/anime_collection/anime1.jpeg',            
            volume: 2778                               
        },{
            id: 2,
            floor: '0.11',
            name: 'Crypto Alien',
            image: '/images/nft/anime_collection/anime2.jpeg',            
            volume: 2778                               
        },{
            id: 3,
            floor: '0.11',
            image: '/images/nft/anime_collection/anime3.jpeg',            
             volume: 2778                               
        },{
            id: 4,
            floor: '0.11',
            image: '/images/nft/anime_collection/anime4.jpeg',            
             volume: 2778                               
        },{
            id: 5,
            floor: '0.11',
            image: '/images/nft/anime_collection/anime5.jpeg',            
             volume: 2778                               
        },{
            id: 6,
            floor: '0.11',
            image: '/images/nft/anime_collection/anime6.jpeg',            
             volume: 2778                               
        },{
            id: 7,
            floor: '0.11',
            image: '/images/nft/anime_collection/anime7.jpeg',            
             volume: 2778                               
        },{
            id: 8,
            floor: '0.11',
            image: '/images/nft/anime_collection/anime8.jpeg',            
             volume: 2778                               
        },{
            id: 9,
            floor: '0.11',
            image: '/images/nft/anime_collection/anime9.jpeg',            
             volume: 2778                               
        },{
            id: 10,
            floor: '0.11',
            image: '/images/nft/anime_collection/anime10.jpeg',            
             volume: 2778                               
        },{
            id: 11,
            floor: '0.11',
            image: '/images/nft/anime_collection/anime11.jpeg',            
             volume: 2778                               
        },{
            id: 12,
            floor: '0.11',
            image: '/images/nft/anime_collection/anime12.jpeg',            
             volume: 2778                               
        },,{
            id: 13,
            floor: '0.11',
            image: '/images/nft/anime_collection/anime13.jpeg',            
             volume: 2778                               
        },
    ]
  return (
    <div className=' flex flex-col min-h-fit py-5 px-5 lg:px-20 gap-3'>
        <div className='flex flex-col justify-between '>
            <p className='font-bold text-lg'>Anime Collections</p>
        </div>
        <div className='flex gap-3 flex-row items-center overflow-x-auto p-3'>
            {
                nfts.map(nft=>(
                    <Link href={'/nft/nftId'} key={nft.id} className={`rounded-lg overflow-hidden hover:-translate-y-1 min-w-fit cursor-pointer duration-200 shadow-md hover:shadow-2xl ${isNightMode ? 'bg-[#9e8c8c15]' : ''} `}>
                            <Image src={nft.image} className='w-[200px] h-[200px]' height={500} width={500}/>
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
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default AnimeCollection