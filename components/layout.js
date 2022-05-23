import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }) {
    return (
      <>
        <Navbar />
        <div id="fb-root"></div>
        <main>{children}</main>
        <Footer />
      </>
    )
  };