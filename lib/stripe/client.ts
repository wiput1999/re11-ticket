import Stripe from 'stripe'

export const stripe = () => {
  const stripeKey = process.env.STRIPE_SECRET_KEY

  if (!stripeKey) {
    throw new Error('Stripe Key is required')
  }

  return new Stripe(stripeKey, {
    apiVersion: '2022-08-01',
  })
}
