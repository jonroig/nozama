import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Otherpages.module.css';


function Wtf() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nozama: About</title>
          <meta name="description" content="Analyze your Amazon purchase history." />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        
        <main className={styles.main}>
          <h1 className={styles.title}>About Nozama</h1>
          <Image src='/witchcraft-06_0-16.png' width='666' height='541' layout='responsive' alt='About Nozama.dev'/>
          <p>
            ... wait. I spent how much?
          </p>
          <p>
            Nozama is an easy way to look back at your Amazon purchases. 
          </p>
          <p>
            Driven by our own needs to analyze our household spending as much as 
            just pure curiosity, this site was created by 
            {' '}<Link href="https://jonroig.com"><a>Jon Roig</a></Link>.
          </p>
          <p>
            It&apos;s still a little rough around the edges, but we hope that you find it 
            as useful as we have. Frankly, it was a little disturbing to see 
            how much we&apos;d spent since the beginning of the pandemic.
          </p>
          <p>
            This site makes money through affiliate links to Amazon. We don&apos;t collect
            any information on you or your purchases whatsoever.
          </p>
          <p>
            We're <Link href="https://github.com/jonroig/nozama"><a>Open Source</a></Link>, so feel free to check out the code, improve it by adding features 
            or fixing bugs.
          </p>
          <p>
            Our stack:
            <ul>
              <li>NextJS</li>
              <li>Glide Data Grid</li>
              <li>Chart.JS</li>
              <li>Vercel</li>
              <li>Yahoo Finance</li>
              <li>ReactDayPicker</li>
            </ul>
          </p>

        </main>
      </div>
    )
  }
  
  export default Wtf;