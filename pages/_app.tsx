import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import client from '@lib/apollo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps}>
        <Head>
          <title>YWC Reunion 11</title>
        </Head>
      </Component>
    </ApolloProvider>
  )
}

export default MyApp
