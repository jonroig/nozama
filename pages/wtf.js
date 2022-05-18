import Head from 'next/head';
import styles from '../styles/Otherpages.module.css';


function Wtf() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nozama: WTF</title>
          <meta name="description" content="Analyze your Amazon purchase history." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div></div>
        
        <main className={styles.main}>
          <h1 className={styles.title}>WTF?</h1>
          <p>
            Nozama is a comprehensive look back at Amazon purchases. After you've exported your purchase data from Amazon in csv format, Nozama can help you make sense of all your spending.
          </p>

        <h3>Features</h3>
        <ul>
          <li>Privacy focused / client-side only... no data is sent back to the server</li>
          <li>Groups purchases by category and item</li>
          <li>Sorts purchases by spending or frequency</li>
          <li>Graphs spending over time</li>
          <li>Stock comparison: if you'd spent your money on AMZN stock, how much would your investment be worth now?</li>
        </ul>

        </main>
      </div>
    )
  }
  
  export default Wtf;