import Image from 'next/image'
import Typewriter from 'typewriter-effect'
import styles from './DashDisplay.css'
import { useGlobal } from '../../context/GlobalContext'

const DashDisplay = () => {
    const { setLogin } = useGlobal();
    return (
        <div className='div_container'>
            <div id='title_div'>
                <p id='title1'>Discover, Buy and Sell NFTs..</p>
                <div className={styles.typewriterContainer}>
                    <Typewriter
                        options={{
                            strings: ['Discover the stunning power of WEB3', 'Join lets take Trading to a different level..'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>
            <div id='image_row'>
                <div className='first_images_div'>
                    <Image id='image1' src={'/images/bg1.jpg'} width={500} height={500} />
                    <Image id='image2' src={'/images/bg2.jpg'} width={500} height={500} />
                </div>
                <div id='last_image_div'>
                    <Image id='image3' src={'/images/bg3.jpg'} width={500} height={500} />
                </div>
            </div>
        </div>
    )
}
export default DashDisplay