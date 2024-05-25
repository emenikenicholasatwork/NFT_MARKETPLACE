import Image from "next/image"
import styles from "./styles.css"

const page = () => {
  return (
    <main className="flex flex-row">
        <div className="flex flex-col">
            <div>
                <Image src={''} width={500} height={500}/>
            </div>
        </div>
        <div>

        </div>
    </main>
  )
}
export default page