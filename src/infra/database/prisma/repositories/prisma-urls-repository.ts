import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

import { UrlsRepository } from '@/domain/user/application/repositories/urls-repository'
import { PrismaUrlMapper } from '../mapers/prisma-urls-mapers'
import { Url } from '@/domain/user/enterprise/entities/Url'

@Injectable()
export class PrismaUrlsRepository implements UrlsRepository {
  constructor(private prisma: PrismaService) {}
  async create(url: Url): Promise<any> {
    const data = PrismaUrlMapper.toPrisma(url)

    return await this.prisma.url.create({
      data,
    })
  }
}
