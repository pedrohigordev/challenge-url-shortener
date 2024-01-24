import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Env } from '@/infra/env/env'
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as shortid from 'shortid'

interface OriginalUrl {
  url: string
}

@Controller('/shorten')
@UseGuards(JwtAuthGuard)
export class UrlShortenerController {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService<Env, true>,
  ) {}

  private generateShortenedUrl(urlStandart: string, hash: string): string {
    return `${urlStandart}/${hash}`
  }

  @Post()
  @HttpCode(201)
  async handle(@Body() body: OriginalUrl, @CurrentUser() user: UserPayload) {
    const { url } = body
    const longId = shortid.generate()
    const urlStandart = this.config.get('URL_STANDART', { infer: true })
    const hash = longId.substring(0, 6)

    const shortenedUrl = this.generateShortenedUrl(urlStandart, hash)

    await this.prisma.url.create({
      data: {
        original_url: url,
        hash,
        user: {
          connect: {
            id: user.sub,
          },
        },
      },
    })

    return {
      original_url: url,
      shortened_url: shortenedUrl,
    }
  }
}
