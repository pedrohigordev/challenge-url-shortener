import { Injectable, NotFoundException } from '@nestjs/common'
import { UrlsRepository } from '../repositories/urls-repository'

interface DeleteUrlUseCaseRequest {
  urlId: string
}

@Injectable()
export class DeleteUrlUseCase {
  constructor(private urlRepository: UrlsRepository) {}

  async execute({ urlId }: DeleteUrlUseCaseRequest) {
    const url = await this.urlRepository.findUrlByurlId(urlId)

    if (!url) {
      throw new NotFoundException('URl not exists')
    }

    await this.urlRepository.delete(urlId)
  }
}
