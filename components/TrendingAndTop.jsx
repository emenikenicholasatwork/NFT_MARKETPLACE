"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react'

const TrendingAndTop = () => {
    const [isImageHovering, setIsImageHovering] = useState(false)

    const nfts = [
        {
          id: 1,
          name: 'Ape Mutan ',
          floor_price: 0.27,
          volume: 203.9,
          image: '/images/ape1.jpg',
          collection: [
            {
                id: 1,
                image: '/images/ape1.jpg'
            }, {
                id: 2,
                image: '/images/ape1.jpg'
            }, {
                id: 3,
                image: '/images/ape1.jpg'
            }, {
                id: 4,
                image: '/images/ape1.jpg'
            },
          ]
        },{
          id: 2,
          name: 'Ape Mutan ',
          floor_price: 0.27,
          volume: 203.9,
          image: '/images/ape1.jpg',
          collection: [
            {
                id: 1,
                image: '/images/ape1.jpg'
            }, {
                id: 2,
                image: '/images/ape1.jpg'
            }, {
                id: 3,
                image: '/images/ape1.jpg'
            }, {
                id: 4,
                image: '/images/ape1.jpg'
            },
          ]
        },{
          id: 3,
          name: 'Ape Mutan ',
          floor_price: 0.27,
          volume: 203.9,
          image: '/images/ape1.jpg',
          collection: [
            {
                id: 1,
                image: '/images/ape1.jpg'
            }, {
                id: 2,
                image: '/images/ape1.jpg'
            }, {
                id: 3,
                image: '/images/ape1.jpg'
            }, 
          ]
        },{
          id: 4,
          name: 'Ape Mutan ',
          floor_price: 0.27,
          volume: 203.9,
          image: '/images/ape1.jpg',
          collection: [
            {
                id: 1,
                image: '/images/ape1.jpg'
            }, {
                id: 2,
                image: '/images/ape1.jpg'
            }, {
                id: 3,
                image: '/images/ape1.jpg'
            },
          ]
        },{
          id: 5,
          name: 'Ape Mutan ',
          floor_price: 0.27,
          volume: 203.9,
          image: '/images/ape1.jpg',
          collection: [
            {
                id: 1,
                image: '/images/ape1.jpg'
            }, {
                id: 2,
                image: '/images/ape1.jpg'
            }, {
                id: 3,
                image: '/images/ape1.jpg'
            }, {
                id: 4,
                image: '/images/ape1.jpg'
            },
          ]
        },{
            id: 6,
            name: 'Ape Mutan ',
            floor_price: 0.27,
            volume: 203.9,
            image: '/images/ape1.jpg',
            collection: [
              {
                  id: 1,
                  image: '/images/ape1.jpg'
              }, {
                  id: 2,
                  image: '/images/ape1.jpg'
              }, {
                  id: 3,
                  image: '/images/ape1.jpg'
              }, {
                  id: 4,
                  image: '/images/ape1.jpg'
              },
            ]
          },{
            id: 7,
            name: 'Ape Mutan ',
            floor_price: 0.27,
            volume: 203.9,
            image: '/images/ape1.jpg',
            collection: [
              {
                  id: 1,
                  image: '/images/ape1.jpg'
              }, {
                  id: 2,
                  image: '/images/ape1.jpg'
              }, {
                  id: 3,
                  image: '/images/ape1.jpg'
              }, {
                  id: 4,
                  image: '/images/ape1.jpg'
              },
            ]
          },{
            id: 8,
            name: 'Ape Mutan ',
            floor_price: 0.27,
            volume: 203.9,
            image: '/images/ape1.jpg',
            collection: [
              {
                  id: 1,
                  image: '/images/ape1.jpg'
              }, {
                  id: 2,
                  image: '/images/ape1.jpg'
              }, {
                  id: 3,
                  image: '/images/ape1.jpg'
              }, {
                  id: 4,
                  image: '/images/ape1.jpg'
              },
            ]
          },{
            id: 9,
            name: 'Ape Mutan ',
            floor_price: 0.27,
            volume: 203.9,
            image: '/images/ape1.jpg',
            collection: [
              {
                  id: 1,
                  image: '/images/ape1.jpg'
              }, {
                  id: 2,
                  image: '/images/ape1.jpg'
              }, {
                  id: 3,
                  image: '/images/ape1.jpg'
              }, {
                  id: 4,
                  image: '/images/ape1.jpg'
              },
            ]
          },{
            id: 10,
            name: 'Ape Mutan ',
            floor_price: 0.27,
            volume: 203.9,
            image: '/images/ape1.jpg',
            collection: [
              {
                  id: 1,
                  image: '/images/ape1.jpg'
              }, {
                  id: 2,
                  image: '/images/ape1.jpg'
              }, {
                  id: 3,
                  image: '/images/ape1.jpg'
              }, {
                  id: 4,
                  image: '/images/ape1.jpg'
              },
            ]
          },
      ];
      // Split the products array into two separate arrays
  const firstHalf = nfts.slice(0, Math.ceil(nfts.length / 2));
  const secondHalf = nfts.slice(Math.ceil(nfts.length / 2));
  return (
    <div className='w-full'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-2'>
          <p className='p-3 rounded-md font-bold bg-[#9e8c8c25] active:bg-[#9e8c8c75]'>Trending</p>
          <p className='font-bold p-3 rounded-md bg-[#9e8c8c25] active:bg-[#9e8c8c75]'>Top</p>
        </div>
        <div className='flex flex-row items-center gap-5'>
            <div className='flex flex-row items-center gap-2'>
            <p className='px-5 py-2 rounded-md bg-[#9e8c8c25] cursor-pointer'>1h</p>
            <p className='px-5 py-2 rounded-md bg-[#9e8c8c25] cursor-pointer'>6h</p>
            <p className='px-5 py-2 rounded-md bg-[#9e8c8c25] cursor-pointer'>24h</p>
            <p className='px-5 py-2 rounded-md bg-[#9e8c8c25] cursor-pointer'>7d</p>
            </div>
          <div className='flex flex-row items-center gap-2 cursor-pointer p-2 px-5 bg-[#9e8c8c25] rounded-md'>
            <p>All chains</p>
            <i className='bi bi-chevron-down'></i>
          </div>
          <p className='px-5 py-2 cursor-pointer rounded-md bg-[#9e8c8c25]'>View all</p>
        </div>
      </div>
      <div className='flex flex-row gap-20 mt-5'>
        <div className='flex-1'>
            <div className='flex flex-row font-thin'>
                <div className='flex-[.4]'>
                    <span>Rank</span>
                </div>
                <div className='flex-[3]'>
                    <span>Collection</span>
                </div>
                <div className='flex-[.9]'>
                    <span>Floor Price</span>
                </div>
                <div className='flex-[.5] text-end'>
                    <span>Volume</span>
                </div>
            </div>
            <hr className='border-1 border-gray-500'/>
            <div className='mt-3'>
                {
                    firstHalf.map(nft => (
                        <div key={nft.id} className='flex-row flex items-center cursor-pointer hover:bg-[#9e8c8c25] p-2 rounded-lg relative'>
                            <div className=' me-[60px]'>
                                <span>{nft.id}</span>
                            </div>
                            <div className='flex flex-row items-center gap-6 flex-[3]'>
                                {isImageHovering === nft.id && (
                                    <div className='rounded-lg absolute flex flex-row overflow-hidden'>
                                        {nft.collection.map((col, index) => (
                                            <div key={index}>
                                                <Image
                                                    src={col.image}
                                                    width={70} 
                                                    height={70} 
                                                    alt='Nft collections'
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            <Image src={nft.image} className='rounded-lg z-10 relative' width={70} height={20} alt="nft image"
                                        onMouseEnter={() => setIsImageHovering(nft.id)}
                                        onMouseLeave={() => setIsImageHovering(null)}
                                    />
                                <span>{nft.name}</span>
                            </div>
                            <div className='flex-[.9]'>
                                <span>{nft.floor_price} ETH</span>
                            </div>
                            <div className='flex-[.5] text-end'>
                                <span>{nft.volume} ETH</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='flex-1'>
            <div className='flex flex-row font-thin'>
                <div className='flex-[.4]'>
                    <span>Rank</span>
                </div>
                <div className='flex-[3]'>
                    <span>Collection</span>
                </div>
                <div className='flex-[.9]'>
                    <span>Floor Price</span>
                </div>
                <div className='flex-[.5] text-end'>
                    <span>Volume</span>
                </div>
            </div>
            <hr className='border-1 border-gray-500'/>
            <div className='mt-3'>
            {
                    secondHalf.map(nft => (
                        <div key={nft.id} className='flex-row flex items-center cursor-pointer hover:bg-[#9e8c8c25] p-2 rounded-lg'>
                            <div className=' me-[60px]'>
                                <span>{nft.id}</span>
                            </div>
                            <div className='flex flex-row items-center gap-6 flex-[3] relative'>
                            <Image src={nft.image} className='rounded-lg z-10' width={70} height={20} alt="nft image"
                                        onMouseEnter={() => setIsImageHovering(nft.id)}
                                        onMouseLeave={() => setIsImageHovering(null)}
                                    />
                                    {isImageHovering === nft.id && (
                                        <div className='rounded-lg absolute flex flex-row'>
                                            {nft.collection.map((col, index) => (
                                                <div key={index}>
                                                    <Image
                                                        src={col.image}
                                                        width={70} 
                                                        height={70} 
                                                        alt='Nft collections'
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                <span>{nft.name}</span>
                            </div>
                            <div className='flex-[.9]'>
                                <span>{nft.floor_price} ETH</span>
                            </div>
                            <div className='flex-[.5] text-end'>
                                <span>{nft.volume} ETH</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        {/* <div className='w-full flex-1'>
            <div className='flex flex-row'>
                <div className='flex-1'>
                    <span>Rank</span>
                </div>
                <div className='flex-1'>
                    <span>Collection</span>
                </div>
                <div className='flex-1'>
                    <span>Floor Price</span>
                </div>
                <div className='flex-1'>
                    <span>Volume</span>
                </div>
            </div>
            <hr className='border-1 border-gray-500'/>
            <div>
                <div className='flex-row flex items-center'>
                    <div>
                        <span>1</span>
                    </div>
                    <div className='flex flex-row items-center'>
                        <img src="/images/ape1.jpg" width={30} height={20} alt="nft image" />
                        <span>Just for the apes</span>
                    </div>
                    <div>
                        <span>0.004 ETH</span>
                    </div>
                    <div>
                        <span>234.5 ETH</span>
                    </div>
                </div>
            </div>
        </div> */}
      </div>
    </div>
  )
}

export default TrendingAndTop