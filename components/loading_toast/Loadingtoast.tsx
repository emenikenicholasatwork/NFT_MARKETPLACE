import React from 'react'
import { RotatingTriangles } from 'react-loader-spinner'

const Loadingtoast = () => {
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
                    <p className='font-bold text-lg text-black'>Loading</p>
                </div>
            </div>
        </div>
    )
}

export default Loadingtoast