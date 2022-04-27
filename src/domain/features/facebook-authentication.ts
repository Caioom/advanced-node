import { AccessToken } from '@/domain/models'
import { AuthenticationError } from '@/domain/models/errors'

export interface FacebookAuthentication {
  perform: (token: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

export namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}
