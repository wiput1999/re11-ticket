import { Resolvers } from '@codegen/resolvers'

import { mutation as paymentMutation } from './payment.mutation'

export const mutations: Resolvers['Mutation'] = {
  ...paymentMutation,
}
