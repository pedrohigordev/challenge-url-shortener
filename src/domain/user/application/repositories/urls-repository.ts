import { Url } from '../../enterprise/entities/Url'

export interface ResponseUrlShortened {
  original_url: string
  shortened_url: string
}

export interface UpdateInputUrl {
  urlId: string
  newdestinyUrl: string
}

export abstract class UrlsRepository {
  abstract findUrlByurlId(urlId: string): Promise<Url>
  abstract create(url: Url): Promise<ResponseUrlShortened>
  abstract delete(urlId: string): Promise<void>
  abstract update(updateInputUrl: UpdateInputUrl): Promise<void>
  abstract listUrls(userId: string): Promise<Url[]>
  abstract acessUrl(hash: string): Promise<void>
}
