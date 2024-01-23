import { Controller, Get, UseGuards } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { UserPayload } from 'src/auth/jwt.strategy'

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
    })
  }
}
