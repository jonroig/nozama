import Script from 'next/script';
import Head from 'next/head';

import Navbar from './navbar';
import Footer from './footer';
import config from '../config';

export default function Layout({ children }) {
    return (
      <>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${config.gtag}`} strategy="afterInteractive"/>
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${config.gtag}');`}
        </Script>
        <Navbar />
        <div id="fb-root"></div>
        <main>{children}</main>
        <Footer />
      </>
    )
  };