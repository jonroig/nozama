import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import Link from 'next/link';

import styles from '../styles/Home.module.css';
const Upload = dynamic(
  () => import('../components/upload'),
  { ssr: false }
);
const Report = dynamic(
  () => import('../components/report'),
  { ssr: false }
);

export default function Home() {
  const [reportContent, setReportContent] = useState(null);
  
  if (reportContent) {
    return (
      <Report orderArray={reportContent} />
    );
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Nozama... a look back at your Amazon purchase history</title>
        <meta name="description" content="Analyze your Amazon purchase history." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div></div>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
          NOZAMA
        </h1>
        <h2 className={styles.subTitle}>... a look back at your Amazon purchases...</h2>

        <p className={styles.description}>
          Import Amazon Order History Report
        </p>
        <Upload setReportContent={setReportContent}/>
        <br/><br/><br/><br/>

        <div className={styles.grid}>
          <Link href="/privacy" >
            <a className={styles.card}>
              <h2>Privacy &rarr;</h2>
              <p>Your data is 100% private. Nothing is logged or sent back to a server.</p>
            </a>
          </Link>
          <Link href="/amazonpurchasehistory">
            <a className={styles.card}>
              <h2>Purchase History &rarr;</h2>
              <p>
                A quick guide to grabbing your AMZN purchase history.
              </p>
            </a>
          </Link>
          <Link href="/wtf">
            <a className={styles.card}>
              <h2>WTF? &rarr;</h2>
              <p>What is Nozama and how does it work?</p>
            </a>
          </Link>
          <Link href="https://github.com/jonroig/nozama">
            <a className={styles.card}>
              <h2>Open Source &rarr;</h2>
              <p>Errors / ideas? PRs welcome!</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
