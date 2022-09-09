import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
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
