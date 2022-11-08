import { HttpResponse, badRequest, unauthorized, errorServer, ok } from '@/application/helpers'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { RequiredFieldError } from '@/application/errors'

type HttpRequest = {
  token: string
}

type Model = Error | {
  accessToken: String
}

export class FacebookLoginController {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) {
        return badRequest(error)
      }
      const accessToken = await this.facebookAuthentication.perform({ token: httpRequest.token })
      if (accessToken instanceof AccessToken) {
        return ok({
          accessToken: accessToken.value
        })
      } else {
        return unauthorized()
      }
    } catch (error) {
      return errorServer(error)
    }
  }

  private validate (httpRequest: HttpRequest): Error | undefined {
    if (httpRequest.token === '' || httpRequest.token === undefined || httpRequest.token === null) {
      return new RequiredFieldError('token')
    }
  }
}
