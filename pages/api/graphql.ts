import { gql, ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { NextApiRequest, NextApiResponse } from 'next'

const books = [
  {
    id: 0,
    name: 'JavaScript for Dummies',
  },
  // ... Write a few more ...
]

const typeDefs = gql`
  type Book {
    id: ID!
    name: String
  }
  type Query {
    getBooks: [Book]
  }
`

const resolvers = {
  Query: {
    getBooks: () => {
      return books
    },
  },
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
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
