import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/Otherpages.module.css';
import config from '../config';

function Amazonpurchasehistory() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nozama: Amazon Order History : Download / Export Shopping History CSV </title>
          <meta name="description" content="Your data belongs to you. A guide to exporting / downloading your Amazon order history" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@_nozama_" />
          <meta name="twitter:creator" content="@runnr_az" />
          <meta name="twitter:title" content="Nozama.dev... Amazon shopping history csv export" />
          <meta name="twitter:description" content="Your data belongs to you. A guide to exporting / downloading your Amazon shopping history"/>
          <meta name="twitter:image" content="https://nozama.dev/colorcard.jpg"/>
        </Head>
        
        <main className={styles.main}>
          <h1 className={styles.title}>Purchase History</h1>
          <h2>You own your Amazon purchase history.<br/>
          Request a copy -- it only takes 2 mins</h2>
          <div>
            <Image src='/RequestOrderHistoryReport.png' width={387}  height={313} layout='intrinsic' alt='Export your Amazon purchase history'/>
          </div>
          <ol>
            <li>Go to <a href={`https://www.amazon.com/gp/b2b/reports?tag=${config.affiliateId}`} target="_blank" rel="noreferrer">Order History Reports</a> in Your Account.</li>
            <li>Select &lsquo;Items&rsquo; report type from the drop-down menu.</li>
            <li>Fill in the start date, end date, and report name. We recommend starting with 1/1/2006, ending today </li>
            <li>Click Request Report</li>
          </ol>
          <p>
            When the report is complete, you&apos;ll receive an email notification. It takes about 2 minutes.
          </p>
          <p>
            To retrieve the report, visit <a href={`https://www.amazon.com/gp/b2b/reports?tag=${config.affiliateId}`} target="_blank" rel="noreferrer">Order History Reports</a> and select Download.
          </p>
        </main>
      </div>
    );
  }
  
  export default Amazonpurchasehistory;