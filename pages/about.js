import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/Otherpages.module.css';


function Wtf() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nozama: About</title>
          <meta name="description" content="Analyze your Amazon purchase history." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div></div>
        
        <main className={styles.main}>
          <h1 className={styles.title}>About Nozama</h1>
          <Image src='/witchcraft-06_0-16.png' width='666' height='541' layout='responsive' alt='About Nozama.dev'/>


          <p>
            Nozama is a comprehensive look back at Amazon purchases. After you&apos;ve exported your purchase data from Amazon in csv format, Nozama can help you make sense of all your spending.
          </p>

        </main>
      </div>
    )
  }
  
  export default Wtf;