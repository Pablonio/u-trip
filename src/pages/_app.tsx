import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeContext';
import { NextDevtoolsProvider } from '@next-devtools/core'
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextDevtoolsProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </NextDevtoolsProvider>
  );
}