import { AuthenticationError, ContextFunction } from 'apollo-server-core'
import { PrismaClient } from '@prisma/client'
import { stripe } from '@lib/stripe'
import Stripe from 'stripe'
import { NextApiRequest, NextApiResponse } from 'next'

export interface GQLContext {
  db: PrismaClient
  stripe: Stripe
  userId: string
}

export interface GQLInitialContext {
  req: NextApiRequest
  res: NextApiResponse
}

function verifyGuestToken(token: string) {
  const match = token.match(/GUEST-(?<userId>[\w\d-]+)$/)

  if (!match) {
    throw new AuthenticationError('Invalid token')
  }

  const userId = match.groups?.userId as string

  return userId
}

function verifyAuth(token: string | undefined) {
  if (!token) {
    throw new AuthenticationError('Token required')
  }

  if (token.startsWith('Bearer')) {
    return ''
  }

  return verifyGuestToken(token)
}

export const createContext: ContextFunction<GQLInitialContext, GQLContext> = ({
  req,
}) => {
  const userId = verifyAuth(req.headers.authorization)

  return {
    userId,
    db: new PrismaClient(),
    stripe: stripe(),
  }
}
