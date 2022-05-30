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

  // stock stuff taken out for the short term
  // useEffect(async () => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/amzn');
  //     const amznData = await response.json();
  //     dispatch(loadAmzn(amznData));
  //   }
  //   fetchData();
  // }, [dispatch]);

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

  const showUploadButton = state.orderArray?.length ? false : true;

  return (
    <div className={styles.container}>
      <Head>
        <title>Nozama: Look Back at your Amazon Shopping History</title>
        <meta name="description" content="Analyze your Amazon orders. Parse and graph / sort / filter your Amazon order history CSV... where is all your money going?" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_nozama_" />
        <meta name="twitter:creator" content="@runnr_az" />
        <meta name="twitter:title" content="Nozama: Look Back at your Amazon Shopping History" />
        <meta name="twitter:description" content="Parse and graph / sort / filter your Amazon order history CSV. Slice and dice your past spending... where is all your money going?"/>
        <meta name="twitter:image" content="https://nozama.dev/colorcard.jpg"/>
      </Head>
      <div id="fb-root"></div>
      <div></div>
      
      <main className={styles.main}>
        {showUploadButton && (
          <>
            <div className={styles.pwaImportHeader}>
                <Link href="/amazonpurchasehistory">
                    <Image src="/csv-128.png" width={64} height={64} alt="Amazon purchase history CSV export instructions"/>
                </Link>
                <br/>
                <strong>Get Started:</strong>{' '}
                How To Export<br/><Link href="/amazonpurchasehistory"><a title="Amazon purchase history CSV export instructions">Amazon Order History Report</a></Link>
            </div>
            <p className={styles.importLine }>
            </p>
            <Upload />
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
        <h1 className={styles.tighten}>Look Back at Your Amazon Shopping</h1>
        <p className={styles.explanation}>
          Amazon lets you export your shopping history as a .csv. Nozama helps you parse it.
          <br/><br/>
          Nozama is a comprehensive look back at your Amazon shopping: 
          sort / group / graph / filter your Amazon purchases, see where all your money is going.
          <br/><br/>
          It might surprise you.
        </p>
        <h2 className={styles.tighten}>Features</h2>
        <ul className={styles.featureList}>
          <li><strong>Parse and graph / sort / filter your Amazon order history CSV</strong></li>
          <li>Analyze your Amazon shopping. Wait... I spent how much?</li>
          <li>Grouping: Amazon purchases by category and item</li>
          <li>Sorting: Amazon shopping by spending, frequency, or date</li>
          <li>Filter: Amazon orders by date</li>
          <li>Graph: spending by year / day / cumulative over time</li>
          <li><Link href="/privacy"><a>Privacy focused / client-side only</a></Link>... no data is sent back to the server</li>
          
          <li><Link href="https://github.com/jonroig/nozama"><a>Open source</a></Link>: Errors / ideas? PRs welcome</li>
          <li><a className={styles.demo} onClick={doDemo}>Demo</a> ⭅ Take Nozama for a test drive</li>
        </ul>

        <h2 className={styles.tighten}>Get Started: 2 Easy Steps</h2>
        <ol className={styles.featureList}>
          <li><Link href="/amazonpurchasehistory"><a>Export your Amazon Order History CSV</a></Link></li>
          <li>Import your Amazon Order History CSV</li>
        </ol>
        
        <h2>Example: Spending By Year</h2>
        <a onClick={doDemo}>
          <Image src="/spendingbyyeargraph.png" width="600" height="308" layout='intrinsic' alt="Graph: Amazon spending by year"/>
        </a>
        
        <h2>Share</h2>
        <Share />
        <div style={{paddingLeft: 30 }}>
          <a href="https://www.producthunt.com/posts/nozama?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-nozama" target="_blank" rel="noreferrer" ><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=347409&theme=light" alt="Nozama - &#0046;&#0046;&#0046;&#0032;a&#0032;look&#0032;back&#0032;at&#0032;your&#0032;Amazon&#0032;purchases | Product Hunt" style={{width: '250px', height: '54px'}} width="250" height="54" /></a>
        </div>
        
        <br/>
        <h2>Learn more</h2>
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
