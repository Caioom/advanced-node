import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('FacebookApiIntegrationTests', () => {
  let sut: FacebookApi
  let axiosClient: AxiosHttpClient

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient, 
      env.facebookApi.clientId, 
      env.facebookApi.clientSecret
    )
  })

  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAAQyemahUSkBAOz4cQhZAgld8kVKmVE0ZAWeDBtizMFoFFMwnq6zH2KtjXFrhwopuinFO5Tlrr2d68Pz3IreeeYejPMBUZCzduXZCPBAJTt3WK6XlchS0CDFVvshZAePhib7u9E0F3GSWB52ouvc5HSCDUMoFdyEZB4a7wgWyRmReNZA5l68THO0T0KW80UPkZBLBnCxRKnSP2lFXIrh9DcJ' })

    expect(fbUser).toEqual({
      facebookId: '113683741559012',
      email: 'caio_tmpyjwc_test@tfbnw.net',
      name: 'Caio Test'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBe(undefined)
  })
})
