import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import styles from '../styles/Navbar.module.css';
import { reset } from '../actions';

export default function Navbar({ children }) {

  const dispatch = useDispatch();

  return (
    <div className={styles.main}>
      <Link href="/">
        <a onClick={()=>dispatch(reset())}>
          <Image src="/nozama-logo-smaller.png" alt="Nozama" width={276}  height={94}/>
        </a>
      </Link>
    </div>
  )
}