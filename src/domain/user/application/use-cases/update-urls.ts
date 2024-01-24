import { Injectable } from '@nestjs/common'
import { UpdateInputUrl, UrlsRepository } from '../repositories/urls-repository'

@Injectable()
export class UpdateUrlUseCase {
  constructor(private urlRepository: UrlsRepository) {}

  async execute({ urlId, newdestinyUrl }: UpdateInputUrl) {
    await this.urlRepository.update({
      urlId,
      newdestinyUrl,
    })
  }
}
