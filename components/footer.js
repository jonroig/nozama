import Link from 'next/link';
import Image from 'next/image';
import {
    TwitterIcon,
    FacebookIcon
  } from 'next-share';

import styles from '../styles/Home.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                Straight outta Scottsdale!
            </div>
            <div>
                Ⓒ <Link href="https://jonroig.com"><a>Jon Roig</a></Link> 2022
                <br/>
                <Link href="https://twitter.com/_nozama_"><a><TwitterIcon size={34} round /></a></Link>
                {' '}<Link href="https://www.facebook.com/Nozama-113258568056826"><a><FacebookIcon size={34} round /></a></Link>
                {' '}<Link href="//github.com/jonroig/nozama" passHref><a target="_blank" rel="noreferrer"><Image src="/github_logo.png" height={32} width={32} /></a></Link>
            </div>
      </footer>
    );
  }