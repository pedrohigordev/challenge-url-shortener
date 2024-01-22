import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import { ZoodValidationPipe } from 'src/pipes/zod-validation-pipe'
import * as shortid from 'shortid'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

const shortenBodySchema = z.object({
  url: z.string().url(),
})

type ShortenBodySchema = z.infer<typeof shortenBodySchema>

@Controller('/shorten')
@UseGuards(JwtAuthGuard)
export class UrlShortenerController {
  constructor(private prisma: PrismaService) {}

  private readonly urlDatabase: Record<string, string> = {}

  @Post()
  @UsePipes(new ZoodValidationPipe(shortenBodySchema))
  async handle(@Body() body: ShortenBodySchema) {
    const { url } = body

    const longId = shortid.generate()

    const shortId = longId.substring(0, 6)

    const shortUrl = `http://localhost/${shortId}`

    this.urlDatabase[shortUrl] = url

    return {
      original_url: url,
      shortened_url: shortUrl,
    }
  }
}
