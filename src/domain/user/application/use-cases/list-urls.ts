import { Injectable } from '@nestjs/common'
import { UrlsRepository } from '../repositories/urls-repository'

@Injectable()
export class ListUrlUseCase {
  constructor(private urlRepository: UrlsRepository) {}

  async execute(userId: string) {
    return await this.urlRepository.listUrls(userId)
  }
}
