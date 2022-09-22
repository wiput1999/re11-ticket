import { ContextFunction } from 'apollo-server-core'
import { PrismaClient } from '@prisma/client'

export interface GQLContext {
  db: PrismaClient
}

export const createContext: ContextFunction<unknown, GQLContext> = () => {
  return {
    db: new PrismaClient(),
  }
}
