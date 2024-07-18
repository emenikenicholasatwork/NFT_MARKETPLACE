import Image from 'next/image'
import Typewriter from 'typewriter-effect'

const DashDisplay = () => {
    return (
        <div className='w-[100%] h-fit flex flex-row pt-[90px] px-[2rem] pb-[2rem] '>
            <div className='flex-auto w-[100%] h-[100%] items-center justify-center text-center p-[2%] '>
                <p className=' font-bold text-7xl '>Discover, Buy and Sell NFTs..</p>
                <div>
                    <Typewriter
                        options={{
                            strings: ['Discover the stunning power of WEB3', 'Join lets take Trading to a different level..'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>
            <div className=' pt-20 hidden lg:flex flex-row flex-auto gap-3 w-full '>
                <div className=' gap-3 '>
                    <Image className=' w-[300px] h-[200px] ' src={'/images/bg1.jpg'} width={500} height={500} alt={''} />
                    <Image className=' pt-3 w-[300px] h-[500px] ' src={'/images/bg2.jpg'} width={500} height={500} alt={''} />
                </div>
                <div className=' flex items-baseline justify-[baseline] '>
                    <Image className=' pt-20 w-[300px] h-[600px] ' src={'/images/bg3.jpg'} width={500} height={500} alt={''} />
                </div>
            </div>
        </div>
    )
}
export default DashDisplay