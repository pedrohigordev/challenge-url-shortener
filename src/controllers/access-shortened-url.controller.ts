import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
@Controller('/')
export class AccessUrlShortenedController {
  constructor(private prisma: PrismaService) {}

  @Get(':hash')
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

    return hashAlreadyExists
  }
}
