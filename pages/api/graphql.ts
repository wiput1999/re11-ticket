import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { NextApiRequest, NextApiResponse } from 'next'

import { typeDefs, createContext, resolvers } from '@graphql/server'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: createContext,
})

const startServer = apolloServer.start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
