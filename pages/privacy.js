import Head from 'next/head';

import styles from '../styles/Otherpages.module.css';

function Privacy() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Nozama... a look back at your Amazon purchase history</title>
          <meta name="description" content="Analyze your Amazon purchase history." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div></div>
        
        <main className={styles.main}>
          <h1 className={styles.title}>Privacy</h1>
          <h2>Your data is 100% private.</h2>
       
          <p>
            Your purchase history is not uploaded to our central servers, nor does 
            Nozama attempt to retain your data in any way.
          </p>
          <p>
            For convenience's sake, Nozama does persist your data in your browser's{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank" rel="noreferrer">localStorage</a>, 
            so when you resume a session its waiting for you there, no 
            need to get the app to re-read the purchzse history CSV.
          </p>
          <p>
            We do 3rd party tracking with Google Analytics and we load images
            from Amazon, but presumably, they already know what you've purchased from them.
          </p>
          <h2>No Hidden Tricks</h2>
          <p>
            Nozama makes its money as an Amazon Affiliate. 
          </p>
          <p>
            Any time you on a product or service
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