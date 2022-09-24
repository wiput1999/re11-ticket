import { Resolvers } from '@codegen/resolvers'

export const query: Resolvers['Query'] = {
  getBooks: () => {
    return [
      {
        id: '0',
        name: 'JavaScript for Dummies',
      },
    ]
  },
}
