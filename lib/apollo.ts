import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { tokenStore } from './utils/tokenStore'

const httpLink = createHttpLink({
  uri: '/api/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  const token = await tokenStore.getToken()

  return {
    headers: {
      ...headers,
      authorization: token,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
