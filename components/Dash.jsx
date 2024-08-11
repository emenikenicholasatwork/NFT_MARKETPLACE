import Image from 'next/image'
import React from 'react'

const Dash = () => {
    const nfts = [
        {
            id: 1,
            floor: '0.011',
            name: 'Classic Tiger',
            image: '/images/notable3.jpg'
        }, {
            id: 2,
            floor: '0.41',
            name: 'Swag Ape',
            image: '/images/nft/ape1.jpg'
        }, {
            id: 3,
            floor: '0.0511',
            name: 'Soldier Boy',
            image: '/images/nft/anime1.jpeg'
        }, {
            id: 4,
            floor: '0.0011',
            name: 'Lone Girl',
            image: '/images/nft/anime10.jpeg'
        }, {
            id: 5,
            floor: '0.67',
            name: 'Glass Rose',
            image: '/images/nft/classic10.jpeg'
        }, {
            id: 6,
            floor: '0.77',
            name: 'Classic Car',
            image: '/images/nft/classic6.jpeg'
        }, {
            id: 7,
            floor: '0.0007',
            name: 'Art Clown',
            image: '/images/nft/art1.jpeg'
        }, {
            id: 8,
            floor: '0.00040',
            name: 'Azuki Boy',
            image: '/images/nft/art12.jpeg'
        }, {
            id: 9,
            floor: '0.0007',
            name: 'Angry Ape',
            image: '/images/nft/ape5.jpg'
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
                        <div className='relative rounded-lg shadow-lg duration-300 overflow-hidden min-w-[500px] min-h-[500px] ' key={nft.id}>
                            <div className='text-white absolute bottom-2 left-3'>
                                <p className='font-bold text-sm'>{nft.name}</p>
                                <p className='font-light text-sm'>Floor: {nft.floor} ETH</p>
                            </div>
                            <div className="w-[500px]">
                                <Image src={nft.image} className=' min-w-[500px] w-[500px] h-[500px] cursor-pointer shadow-md hover:scale-110 duration-300' height={100} width={600} alt='NFT dash image' />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Dash