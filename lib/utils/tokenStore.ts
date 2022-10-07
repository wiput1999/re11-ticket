import * as localForage from 'localforage'
import { nanoid } from 'nanoid'

class TokenStore {
  private token = ''

  async getToken(): Promise<string> {
    if (this.token) return this.token

    const storageKey = `ywc-token`

    const token = await localForage.getItem<string>(storageKey)

    if (token) {
      return token
    }

    const userId = nanoid(9).slice(0, 9)

    const newToken = `GUEST-${userId}`

    await localForage.setItem(storageKey, newToken)

    return newToken
  }
}

export const tokenStore = new TokenStore()
