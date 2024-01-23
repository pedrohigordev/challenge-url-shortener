import { Controller, Get, NotFoundException, Query } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const hashQuerySchema = z.object({
  accessHash: z.string(),
  url: z.string(),
})

type HashQuerySchema = z.infer<typeof hashQuerySchema>

@Controller('/access-shortened')
export class AccessUrlShortenedController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@Query() hash: HashQuerySchema) {
    if (hash.url) {
      const urlSplited = hash.url.split('/')
      hash.accessHash = urlSplited[urlSplited.length - 1]
    }

    const hashAlreadyExists = await this.prisma.url.findFirst({
      where: {
        hash: hash.accessHash,
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
