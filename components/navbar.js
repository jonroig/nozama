
import Image from 'next/image';
import styles from '../styles/Navbar.module.css'

export default function Navbar({ children }) {
    return (
      <div className={styles.main}>
        <a href="/">
          <Image src="/nozama-logo-smaller.png" alt="Nozama" width={276}  height={94}/>
        </a>
      </div>
    )
  }