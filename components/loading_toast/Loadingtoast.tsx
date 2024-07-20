import React from 'react'
import { RotatingTriangles } from 'react-loader-spinner'

interface LoadingProps {
    ipfs_image_loading: boolean,
    ipfs_metadata_loading: boolean,
    blockchain_loading: boolean,
    loading: boolean
}

const Loadingtoast: React.FC<LoadingProps> = ({ ipfs_image_loading, ipfs_metadata_loading, blockchain_loading, loading }) => {
    return (
        <div className='fixed h-screen w-full z-50 bg-transparent'>
            <div className='fixed bottom-0 bg-transparent w-full h-36 z-50 flex justify-center items-center'>
                <div className='bg-white shadow-2xl w-56 h-14 gap-5 z-50 flex items-center justify-center rounded-xl'>
                    <RotatingTriangles
                        visible={true}
                        height="50"
                        width="50"
                        color="#4fa94d"
                        ariaLabel="rotating-triangles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    {ipfs_image_loading && <p className='font-bold lg:text-lg text-sm text-black'>Posting Image to IPFS</p>}
                    {ipfs_metadata_loading && <p className='font-bold lg:text-lg text-sm text-black'>Posting Metadata to IPFS</p>}
                    {blockchain_loading && <p className='font-bold lg:text-lg text-sm text-black'>Minting Token to Blockchain</p>}
                    {loading && <p className='font-bold lg:text-lg text-sm text-black'>Loading</p>}
                </div>
            </div>
        </div>
    )
}

export default Loadingtoast