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

  @Post()
  async handle(@Body() body: OriginalUrl, @CurrentUser() user: UserPayload) {
    const { url } = body
    const longId = shortid.generate()

    const shortId = longId.substring(0, 6)

    const shortenedUrl = `http://localhost/${shortId}`

    await this.prisma.url.create({
      data: {
        original_url: url,
        hash: shortId,
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
