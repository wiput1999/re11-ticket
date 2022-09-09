import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'
import { typeDefs } from 'lib/graphql'
import { Resolvers } from '@codegen/resolvers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-08-01',
})

const books = [
  {
    id: '0',
    name: 'JavaScript for Dummies',
  },
]

const resolvers: Resolvers = {
  Query: {
    getBooks: () => {
      return books
    },
  },
  Mutation: {
    createPayment: async () => {
      const paymentIntent = await stripe.paymentIntents.create({
        customer: '',
        amount: 20000,
        payment_method_types: ['promptpay'],
        currency: 'THB',
      })

      return {
        secret: paymentIntent.client_secret ?? '',
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
