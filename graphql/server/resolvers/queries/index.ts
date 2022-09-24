import { Resolvers } from '@codegen/resolvers'

import { query as bookQuery } from './book.query'

export const queries: Resolvers['Query'] = {
  ...bookQuery,
}
