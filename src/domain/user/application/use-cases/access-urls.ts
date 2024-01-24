import { Injectable } from '@nestjs/common'
import { UrlsRepository } from '../repositories/urls-repository'

@Injectable()
export class AccessUrlUseCase {
  constructor(private urlRepository: UrlsRepository) {}

  async execute(accessurl: string): Promise<string> {
    return await this.urlRepository.acessUrl(accessurl)
  }
}
