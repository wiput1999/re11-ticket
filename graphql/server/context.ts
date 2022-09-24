import { ContextFunction } from 'apollo-server-core'
import { PrismaClient } from '@prisma/client'
import { stripe } from '@lib/stripe'
import Stripe from 'stripe'

export interface GQLContext {
  db: PrismaClient
  stripe: Stripe
}

export const createContext: ContextFunction<unknown, GQLContext> = () => {
  return {
    db: new PrismaClient(),
    stripe: stripe(),
  }
}
