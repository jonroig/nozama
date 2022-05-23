import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { usePapaParse } from 'react-papaparse';
import { useRouter } from 'next/router';

import { loadAmzn, loadData } from '../actions';
import styles from '../styles/Home.module.css';
import { processCSV } from '../lib/processCSV';
import AmznStock from '../components/amznStock';

const Upload = dynamic(
  () => import('../components/upload'),
  { ssr: false }
);

const Share = dynamic(
  () => import('../components/share'),
  { ssr: false }
);


export default function Home() {

  const dispatch = useDispatch();
  const router = useRouter();
  const { readString } = usePapaParse();


  useEffect(async () => {
    const fetchData = async () => {
      const response = await fetch('/api/amzn');
      const amznData = await response.json();
      dispatch(loadAmzn(amznData));
    }
    fetchData();
  }, [dispatch]);

  const doDemo = async () => {
    const response = await fetch('/example.csv');
    const rawData = await response.text()
    readString(rawData, {
      complete: (results) => {
        const orderArray = processCSV(results.data);
        dispatch(loadData(orderArray));
        router.push('/report');
      }
    }) 
  };

  const state = useSelector((state) => state);

  const showUploadButton = state.orderArray.length ? false : true;

  return (
    <div className={styles.container}>
      <Head>
        <title>Nozama... a look back at your Amazon purchase history</title>
        <meta name="description" content="Analyze your Amazon shopping." />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_nozama_" />
        <meta name="twitter:creator" content="@runnr_az" />
        <meta name="twitter:title" content="Nozama.dev" />
        <meta name="twitter:description" content="... a look back at your Amazon spending"/>
        <meta name="twitter:image" content="https://nozama.dev/colorcard.jpg"/>
      </Head>
      <div id="fb-root"></div>
      <div></div>
      
      <main className={styles.main}>
        <h1 className={styles.subTitle}>... a look back at your Amazon purchases...</h1>
        <Image src="/413.jpg" width='1200' height='800' layout='responsive' alt='About Nozama.dev'/>
        {showUploadButton && (
          <>
            <p className={styles.importLine }>
              Import <Link href="/amazonpurchasehistory"><a>Amazon Order History Report</a></Link>
            </p>
            <Upload/>
          </>
        )}
        {!showUploadButton && (
          <>
            <p className={styles.description}>
              <Link href="/report" >
                View your report
              </Link>
            </p>
          </>
        )}
        
        <h2 className={styles.tighten}>Features</h2>
        <ul className={styles.featureList}>
          <li><a className={styles.demo} onClick={doDemo}>Demo</a> ⭅ Take Nozama for a test drive</li>
          <li><Link href="/privacy"><a>Privacy focused / client-side only</a></Link>... no data is sent back to the server</li>
          <li>Grouping: Amazon purchases by category and item</li>
          <li>Sorting: Amazon purchases by spending or frequency</li>
          <li>Spending graphs: Money spent by year, day, cumulative over time</li>
          <li>Stock comparison: if you&apos;d spent your money on AMZN stock, how much would your investment be worth now?</li>
          <li><Link href="https://github.com/jonroig/nozama"><a>Open source</a></Link>: Errors / ideas? PRs welcome</li>
        </ul>
        
        <h2>Share</h2>
        <Share />

        <h2>AMZN Stock Calculator</h2>
        <AmznStock/>
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
          <Link href="/about">
            <a className={styles.card}>
              <h2>About &rarr;</h2>
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
