import { gql, ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-08-01',
})

const books = [
  {
    id: 0,
    name: 'JavaScript for Dummies',
  },
]

const typeDefs = gql`
  type Book {
    id: ID!
    name: String
  }

  type Payment {
    secret: String!
  }

  type Query {
    getBooks: [Book]
  }

  type Mutation {
    createPayment: Payment!
  }
`

const resolvers = {
  Query: {
    getBooks: () => {
      return books
    },
  },
  Mutation: {
    createPayment: async () => {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 20000,
        payment_method_types: ['promptpay'],
        currency: 'THB',
      })

      return {
        secret: paymentIntent.client_secret,
      }
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
