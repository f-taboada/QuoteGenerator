import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// AWS Imports
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

 