import { PrismaService } from '@/infra/database/prisma/prisma.service'
import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
@ApiTags('Access to URL controller')
@Controller('/')
export class AccessUrlShortenedController {
  constructor(private prisma: PrismaService) {}

  @Get(':hash')
  @HttpCode(200)
  async handle(@Param('hash') hash: string) {
    const hashAlreadyExists = await this.prisma.url.findFirst({
      where: {
        hash,
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

    if (!hashAlreadyExists) throw new NotFoundException('Address not found.')

    await this.prisma.url.update({
      where: {
        id: hashAlreadyExists.id,
      },
      data: {
        visits: ++hashAlreadyExists.visits,
      },
    })
  }
}
