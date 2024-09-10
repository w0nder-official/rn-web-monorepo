import '@blankclub/frontend-app/styles/globals.css';
import type { AppProps } from 'next/app';
import { InAppProvider } from '@blankclub/frontend-app/context/InAppProvider';

export default function App({ Component, pageProps }: AppProps) {
  return <InAppProvider><Component {...pageProps} /></InAppProvider>;
}
