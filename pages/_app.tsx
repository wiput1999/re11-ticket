import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps}>
      <Head>
        <title>YWC Reunion 11</title>
      </Head>
    </Component>
  )
}

export default MyApp
