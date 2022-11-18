import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('FacebookApiIntegrationTests', () => {
  it('should return a Facebook User if token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient, 
      env.facebookApi.clientId, 
      env.facebookApi.clientSecret
    )

    const fbUser = await sut.loadUser({ token: 'EAAQyemahUSkBAMNTxW1AZCSckf1s68K7cjHtMbxZC0ZB30kcMZC39M1q8XfIvIXUfaaHC4GROBH8cGVT6IJNU40OoRbZBziC4UimKSjwgWCwudR8yS1ZAuLWdcav5nwrhTePv59ZCgiY5yv1tZAv3yAkmEar28utacp9fSgNoudtCqHvBTZA9ADVUV1YdxwR6x51ciZCXEO9Kvc9AzlaynZCEgu' })

    expect(fbUser).toEqual({
      facebookId: '113683741559012',
      email: 'caio_tmpyjwc_test@tfbnw.net',
      name: 'Caio Test'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient, 
      env.facebookApi.clientId, 
      env.facebookApi.clientSecret
    )

    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBe(undefined)
  })
})
