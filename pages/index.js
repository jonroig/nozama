import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
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
          Nozama
        </h1>
        <h2>... a look back at your Amazon Purchases...</h2>

        <p className={styles.description}>
          Get started by dragging your CSV onto this page
        </p>

        <div className={styles.grid}>
        <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Privacy &rarr;</h2>
            <p>Your data is 100% private. Nothing is logged or sent back to a server.</p>
          </a>



          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Purchase History &rarr;</h2>
            <p>
              A quick guide to grabbing your AMZN purchase history.
            </p>
          </a>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>WTF? &rarr;</h2>
            <p>What is Nozama and how does it work?</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Open Source &rarr;</h2>
            <p>Errors / ideas? PRs welcome!</p>
          </a>

          
        </div>
      </main>

      <footer className={styles.footer}>
        <div>
          Straight outta Scottsdale!
        </div>
        <div>
          By Jon Roig
        </div>
      </footer>
    </div>
  )
}
