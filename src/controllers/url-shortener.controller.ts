import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import * as shortid from 'shortid'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { CurrentUser } from 'src/auth/current-user-decorator'

interface OriginalUrl {
  url: string
}

@Controller('/shorten')
@UseGuards(JwtAuthGuard)
export class UrlShortenerController {
  constructor(private prisma: PrismaService) {}

  private readonly urlDatabase: Record<string, string> = {}

  @Post()
  async handle(@Body() body: OriginalUrl, @CurrentUser() user: UserPayload) {
    const { url } = body
    const longId = shortid.generate()

    const shortId = longId.substring(0, 6)

    const shortUrl = `http://localhost/${shortId}`

    this.urlDatabase[shortUrl] = url

    await this.prisma.url.create({
      data: {
        original_url: url,
        shortened_url: shortUrl,
        user: {
          connect: {
            id: user.sub,
          },
        },
      },
    })

    return {
      original_url: url,
      shortened_url: shortUrl,
    }
  }
}
