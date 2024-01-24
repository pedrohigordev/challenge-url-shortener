import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common'

@Controller('/shorten')
@UseGuards(JwtAuthGuard)
export class ListUrlsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @HttpCode(200)
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
