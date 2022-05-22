import Link from 'next/link';
import styles from '../styles/Home.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                Straight outta Scottsdale!
            </div>
            <div>
                Ⓒ <Link href="https://jonroig.com"><a>Jon Roig</a></Link> 2022
            </div>
      </footer>
    );
  }