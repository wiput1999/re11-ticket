import { Resolvers } from '@codegen/resolvers'

export const mutation: Resolvers['Mutation'] = {
  createPayment: async (_root, _args, ctx) => {
    const paymentIntent = await ctx.stripe.paymentIntents.create({
      customer: '',
      amount: 20000,
      payment_method_types: ['promptpay'],
      currency: 'THB',
    })

    return {
      secret: paymentIntent.client_secret ?? '',
    }
  },
}
