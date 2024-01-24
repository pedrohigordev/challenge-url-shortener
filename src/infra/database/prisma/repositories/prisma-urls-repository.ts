import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

import {
  UpdateInputUrl,
  UrlsRepository,
} from '@/domain/user/application/repositories/urls-repository'
import { PrismaUrlMapper } from '../mapers/prisma-urls-mapers'
import { Url } from '@/domain/user/enterprise/entities/Url'

@Injectable()
export class PrismaUrlsRepository implements UrlsRepository {
  constructor(private prisma: PrismaService) {}
  async findUrlByurlId(urlId: string): Promise<any> {
    return await this.prisma.url.findFirst({
      where: {
        id: urlId,
      },
    })
  }

  async delete(urlId: string): Promise<void> {
    const url = await this.findUrlByurlId(urlId)

    console.log(url)

    if (!url) {
      throw new NotFoundException('URl not exists')
    }

    await this.prisma.url.update({
      where: {
        id: urlId,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }

  update(updateInputUrl: UpdateInputUrl): Promise<void> {
    throw new Error('Method not implemented.')
  }

  listUrls(): Promise<Url[]> {
    throw new Error('Method not implemented.')
  }

  acessUrl(hash: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async create(url: Url): Promise<any> {
    const data = PrismaUrlMapper.toPrisma(url)

    return await this.prisma.url.create({
      data,
    })
  }
}
