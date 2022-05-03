import { HttpGetClient } from '@/infra/http'

import axios from 'axios'

jest.mock('axios')

class AxiosHttpClient {
  async get (args: HttpGetClient.Params): Promise<void> {
    await axios.get(args.url, { params: args.params })
  }
}

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let fakeAxios: jest.Mocked<typeof axios>
  let url: string
  let params: object

  beforeAll(() => {
    url = 'any_string'
    params = { any: 'any' }
    fakeAxios = axios as jest.Mocked<typeof axios>
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  // Quando um componente pode implementar mais de uma classe 
  // é uma boa prática separar cada implementação em describes diferentes
  // assim não fica misturado, mas fazer isso antes da hora infringe o principio do
  // Keep it simple.
  describe('get', () => {
    it('should call get with correct params', async () => {
      await sut.get({ url, params })

      expect(fakeAxios.get).toHaveBeenCalledWith(url, { params })
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })
  })
})
