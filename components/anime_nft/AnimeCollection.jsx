import { useGlobal } from '@/context/GlobalContext'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from "./anime_nft.module.css"
import nfts from './anime_nft.json'

const AnimeCollection = () => {
    const {isNightMode} = useGlobal()
  return (
    <div className=' flex flex-col min-h-fit py-5 px-5 lg:px-20 gap-3'>
        <div className='flex flex-col justify-between '>
            <p className='font-bold text-lg'>Anime Collections</p>
        </div>
        <div className='flex gap-3 flex-row items-center overflow-x-auto p-3'>
            {
                nfts.map(nft=>(
                    <Link href={`/nft/${nft.id}`} key={nft.id} className={`rounded-lg nft overflow-hidden hover:-translate-y-1 min-w-fit cursor-pointer duration-200 shadow-md hover:shadow-2xl ${isNightMode ? 'bg-[#9e8c8c15]' : ''} `}>
                            <Image src={nft.image} className='w-[200px] h-[200px] nft_image' height={500} width={500}/>
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
                                <div>
                                    <button onClick={()=>console.log("added to cart")}  className={styles.add_to_cart_button}>Add to cart</button>
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