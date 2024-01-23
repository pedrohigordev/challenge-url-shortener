import { Controller, Get, NotFoundException, Query } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const hashQuerySchema = z.object({
  accessHash: z.string(),
  url: z.string().nullable(),
})

type HashQuerySchema = z.infer<typeof hashQuerySchema>

@Controller('/access-shortened')
export class AccessUrlShortenedController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@Query() hash: HashQuerySchema) {
    const hashAlreadyExists = await this.prisma.url.findFirst({
      where: {
        hash: hash.accessHash,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!hashAlreadyExists) throw new NotFoundException('Url not found')

    return hashAlreadyExists
  }
}
