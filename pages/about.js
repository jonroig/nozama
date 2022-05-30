import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Otherpages.module.css';


function Wtf() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nozama: About Nozama</title>
          <meta name="description" content="Analyze your Amazon purchase history." />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@_nozama_" />
          <meta name="twitter:creator" content="@runnr_az" />
          <meta name="twitter:title" content="Nozama.dev... about Nozama" />
          <meta name="twitter:description" content="... wait. I spent how much at Amazon?"/>
          <meta name="twitter:image" content="https://nozama.dev/colorcard.jpg"/>
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
            just pure curiosity, Nozama was created by 
            {' '}<Link href="https://jonroig.com"><a>Jon Roig</a></Link> over the course of a few weekends.
          </p>
          <p>
            It&apos;s still a little rough around the edges, but we hope that you find it 
            as useful as we have. Frankly, it was a little disturbing to see 
            how much we&apos;d spent since the beginning of the pandemic.
          </p>
          <p>
            Nozama is not affiliated with Amazon in any way.
          </p>
          <p>
            ... but this site makes money through affiliate links to Amazon. 
            If you use our app and click through to Amazon, we sometimes receive
            a small percentage of your future purchases for a limited amount of time.
          </p>
          <p>
            That&apos;s how we pay the bills. 
            We do not collect any information on you or your purchases.
          </p>
          <p>
            We&apos;re <Link href="https://github.com/jonroig/nozama"><a>Open Source</a></Link>, 
            so feel free to check out the code, improve it by adding features 
            or fixing bugs.
          </p>
          <p>
            Nozama stack:
            <ul>
              <li>NextJS</li>
              <li>Glide Data Grid</li>
              <li>Chart.JS</li>
              <li>Vercel hosting</li>
              <li>Yahoo Finance</li>
              <li>ReactDayPicker</li>
            </ul>
          </p>
        </main>
      </div>
    )
  }
  
  export default Wtf;