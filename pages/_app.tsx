import type { AppProps } from 'next/app';
import './reset.css';
import './styles.css';

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;
