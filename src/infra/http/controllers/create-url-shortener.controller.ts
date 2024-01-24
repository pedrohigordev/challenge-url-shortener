import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { RegisterUrlUseCase } from '@/domain/user/application/use-cases/register-urls'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

interface OriginalUrl {
  url: string
}

@Controller('/shorten')
@ApiTags('Controller to shorten the URL')
@UseGuards(JwtAuthGuard)
export class UrlShortenerController {
  constructor(private registerUrl: RegisterUrlUseCase) {}

  @Post()
  @ApiOperation({
    summary: 'Using this route it will be possible to shorten the URL.',
  })
  @HttpCode(201)
  async handle(@Body() body: OriginalUrl, @CurrentUser() user: UserPayload) {
    const { url } = body

    const result = await this.registerUrl.execute({
      originalUrl: url,
      userId: user.sub,
    })

    return result
  }
}
