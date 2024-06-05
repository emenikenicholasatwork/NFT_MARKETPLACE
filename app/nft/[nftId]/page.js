import Image from "next/image"
import styles from "./page.module.css"

const page = () => {
  return (
    <main className={styles.container_div}>
        <div className={styles.details_div_left}>
            <div>
                <Image className={styles.nft_item_image} src={'/images/notable1.jpg'} width={500} height={500}/>
            </div>
        </div>
        <div className={styles.details_div_right}>
          <h3>Notable #330</h3>
          <p>Owned by WisdomWaves</p>
          <div className={styles.best_offer_div_right}>
            <p>Best offer</p>
            <p>0.7501 WETH <span className={styles.price_in_dollar}>$2,867.26</span></p>
            <button className={styles.make_offer_button}>Make offer</button>
          </div>
          <div className={styles.subject_description_div}>
            <h2 className={styles.subject_description_title}>Subject Description</h2>
            <p><span className={styles.by_title}>By </span> 
MissKaina <br />
A distinctive and vibrant collection representing the rise of the divine feminine. Power, Love, and Beauty portrayed through the creativity of fashion, photography, and NFT.</p>
          </div>
        </div>
    </main>
  )
}
export default page