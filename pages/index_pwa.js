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


export default function PwaHome() {

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
        router.push('/report?returnPath=pwa');
      }
    }) 
  };

  const state = useSelector((state) => state);

  const showUploadButton = state.orderArray?.length ? false : true;

  return (
    <div className={styles.container}>
      <Head>
        <title>Nozama... a look back at your Amazon purchase history</title>
        <meta name="description" content="Analyze your Amazon shopping. Slice and dice your past spending... where is all your money going?" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_nozama_" />
        <meta name="twitter:creator" content="@runnr_az" />
        <meta name="twitter:title" content="Nozama.dev" />
        <meta name="twitter:description" content="... a look back at your Amazon spending. Slice and dice your past spending... where is all your money going?"/>
        <meta name="twitter:image" content="https://nozama.dev/colorcard.jpg"/>
      </Head>
      <div id="fb-root"></div>
      <div></div>
      
      <main className={styles.main}>
        {showUploadButton && (
        <>
            <div className={styles.pwaImportHeader}>
                <Link href="/amazonpurchasehistory?returnPath=pwa">
                    <Image src="/csv-128.png" width={64} height={64} alt="Amazon purchase history CSV export instructions"/>
                </Link>
                <br/>
                <strong>Get Started:</strong>{' '}
                How To Export<br/><Link href="/amazonpurchasehistory?returnPath=pwa"><a title="Amazon purchase history CSV export instructions">Amazon Order History Report</a></Link>
            </div>
            <p className={styles.importLine }>
            </p>
            <Upload returnPath="pwa"/>
        </>
        )}
        {!showUploadButton && (
        <>
            <p className={styles.description}>
            <Link href="/report?returnPath=pwa" >
                View your report
            </Link>
            </p>
        </>
        )}

        <div className={styles.grid}>
        <Link href="#" >
            <a onClick={doDemo} className={styles.card}>
              <h2>Demo &rarr;</h2>
              <p>Sort / Group / Filter by Category / Year and more...</p>
            </a>
          </Link>
          <Link href="/privacy?returnPath=pwa" >
            <a className={styles.card}>
              <h2>Privacy &rarr;</h2>
              <p>Your data is 100% private. Nothing is logged or sent back to a server.</p>
            </a>
          </Link>
          <Link href="/amazonpurchasehistory?returnPath=pwa">
            <a className={styles.card}>
              <h2>Purchase History &rarr;</h2>
              <p>
                A quick guide to grabbing your AMZN purchase history.
              </p>
            </a>
          </Link>
          <Link href="/about?returnPath=pwa">
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
