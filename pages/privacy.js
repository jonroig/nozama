import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/Otherpages.module.css';

function Privacy() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nozama: Privacy</title>
          <meta name="description" content="Your Amazon shopping history belongs to you." />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@_nozama_" />
          <meta name="twitter:creator" content="@runnr_az" />
          <meta name="twitter:title" content="Nozama.dev... Privacy" />
          <meta name="twitter:description" content="Your Amazon shopping history belongs to you."/>
          <meta name="twitter:image" content="https://nozama.dev/colorcard.jpg"/>
        </Head>
        
        <main className={styles.main}>
          <h1 className={styles.title}>Privacy</h1>
          <Image src='/witchcraft-011_0-14.png' width='666' height='541' layout='responsive' alt='Privacy'/>
          <h2>Your data is 100% private.</h2>
       
          <p>
            Your purchase history is not uploaded to our central servers, nor does 
            Nozama attempt to retain your data in any way.
          </p>
          <p>
            We do 3rd party tracking with Google Analytics and we load images
            from Amazon, but presumably, they already know what you&apos;ve purchased from them.
          </p>
          <h2>No Hidden Tricks</h2>
          <p>
            Nozama makes its money as an Amazon Affiliate. 
          </p>
          <p>
            Any time you click on a product or service
            listed on Nozama, a tracking code identifies us as the source and gives us a percentage
            of your future purchases depending on various conditions. 
          </p>
          <p>
            Feel free to take a look at the{' '}
            <a href="https://github.com/jonroig/nozama" title="Nozama Amazon Analyser Source" target="_blank" rel="noreferrer">Nozama source code</a>.
          </p>
          <p>
            PRs are always welcome! 
          </p>
          
        </main>
      </div>
    );
  }
  
  export default Privacy;