import { Provider } from 'react-redux';
import { useStore } from '../store';

import Layout from '../components/layout';
import styles from '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}