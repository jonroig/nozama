import Head from 'next/head';
import Image from 'next/image'

import styles from '../styles/Otherpages.module.css';

const affiliateId = 'nozama072-20';

function Amazonpurchasehistory() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nozama: Privacy</title>
          <meta name="description" content="Analyze your Amazon purchase history." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div></div>
        
        <main className={styles.main}>
          <h1 className={styles.title}>AMZN Purchase History</h1>
          <h2>Get a copy of your Amazon purchase history. Only takes 2 mins.</h2>
          <Image src='/RequestOrderHistoryReport.png' width='387' height='313' layout='fixed' alt='Export your Amazon purchase history'/>
          <ol>
            <li>Go to <a href={`https://www.amazon.com/gp/b2b/reports?tag=${affiliateId}`} target="_blank" rel="noreferrer">Order History Reports</a> in Your Account.</li>
            <li>Select &lsquo;Items&rsquo; report type from the drop-down menu.</li>
            <li>Fill in the start date, end date, and report name. We recommend starting with 1/1/2006, ending today </li>
            <li>Click Request Report</li>
          </ol>
          <p>
            When the report is complete, you&apos;ll receive an email notification. It takes about 2 minutes.
          </p>
          <p>
            To retrieve the report, visit <a href={`https://www.amazon.com/gp/b2b/reports?tag=${affiliateId}`} target="_blank" rel="noreferrer">Order History Reports</a> and select Download.
          </p>
          
        </main>
      </div>
    );
  }
  
  export default Amazonpurchasehistory;