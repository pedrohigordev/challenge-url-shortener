import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Env } from '@/infra/env/env'
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Public } from '@/infra/auth/public'
import { RegisterUrlUseCase } from '@/domain/user/application/use-cases/register-urls'

interface OriginalUrl {
  url: string
}

@Controller('/shorten')
@UseGuards(JwtAuthGuard)
export class UrlShortenerController {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService<Env, true>,
    private registerUrl: RegisterUrlUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @Public()
  async handle(@Body() body: OriginalUrl, @CurrentUser() user: UserPayload) {
    const { url } = body

    const result = await this.registerUrl.execute({
      originalUrl: url,
      userId: user.sub,
    })

    return result
  }
}
