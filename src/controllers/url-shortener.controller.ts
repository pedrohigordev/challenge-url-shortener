import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import * as shortid from 'shortid'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { ConfigService } from '@nestjs/config'
import { Env } from 'src/env'

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
