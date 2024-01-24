import { Injectable } from '@nestjs/common'
import { UrlsRepository } from '../repositories/urls-repository'
import { Url } from '../../enterprise/entities/Url'
import { ConfigService } from '@nestjs/config'
import { Env } from '@/infra/env/env'
import * as shortid from 'shortid'

interface RegisterUrlUseCaseRequest {
  originalUrl: string
  userId: string
}

@Injectable()
export class RegisterUrlUseCase {
  constructor(
    private urlRepository: UrlsRepository,
    private config: ConfigService<Env, true>,
  ) {}

  private generateShortenedUrl(urlStandart: string, hash: string): string {
    return `${urlStandart}/${hash}`
  }

  async execute({ originalUrl, userId }: RegisterUrlUseCaseRequest) {
    const longId = shortid.generate()
    const urlStandart = this.config.get('URL_STANDART', { infer: true })
    const hash = longId.substring(0, 6)

    const shortenedUrl = this.generateShortenedUrl(urlStandart, hash)

    const url = Url.create({
      originalUrl,
      hash,
      userId,
    })

    await this.urlRepository.create(url)

    return {
      original_url: originalUrl,
      shortened_url: shortenedUrl,
    }
  }
}
