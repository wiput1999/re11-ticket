import { Resolvers } from '@codegen/resolvers'
import { mutations } from './mutations'
import { queries } from './queries'

export const resolvers: Resolvers = {
  Mutation: mutations,
  Query: queries,
}
