import { Url } from '../../enterprise/entities/Url'

export interface ResponseUrlShortened {
  original_url: string
  shortened_url: string
}

export abstract class UrlsRepository {
  abstract create(url: Url): Promise<ResponseUrlShortened>
}
