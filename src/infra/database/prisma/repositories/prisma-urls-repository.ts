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

  async update(updateInputUrl: UpdateInputUrl): Promise<void> {
    const url = await this.prisma.url.findFirst({
      where: {
        id: updateInputUrl.urlId,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!url) {
      throw new NotFoundException('URl not exists')
    }

    await this.prisma.url.update({
      where: {
        id: updateInputUrl.urlId,
      },
      data: {
        original_url: updateInputUrl.newdestinyUrl,
      },
    })
  }

  async listUrls(userId: string): Promise<any> {
    return await this.prisma.url.findMany({
      where: {
        userId,
        deletedAt: {
          equals: null,
        },
      },
      select: {
        id: true,
        original_url: true,
        hash: true,
        userId: true,
        visits: true,
        updatedAt: true,
      },
    })
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
