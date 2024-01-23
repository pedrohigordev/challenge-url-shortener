import { Controller, Get, UseGuards } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { CurrentUser } from '@/auth/current-user-decorator'
import { UserPayload } from '@/auth/jwt.strategy'

@Controller('/shorten')
@UseGuards(JwtAuthGuard)
export class ListUrlsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    return await this.prisma.url.findMany({
      where: {
        userId: user.sub,
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
}
