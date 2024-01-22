import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import { ZoodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

const editUrlBodySchema = z.object({
  urlId: z.string(),
  newdestinyUrl: z.string().url(),
})

type EditUrlBodySchema = z.infer<typeof editUrlBodySchema>

@Controller('/shorten')
@UseGuards(JwtAuthGuard)
@UsePipes(new ZoodValidationPipe(editUrlBodySchema))
export class EditUrlController {
  constructor(private prisma: PrismaService) {}

  @Put()
  @HttpCode(201)
  @UsePipes(new ZoodValidationPipe(editUrlBodySchema))
  async handle(@Body() body: EditUrlBodySchema) {
    const { urlId, newdestinyUrl } = body

    const url = await this.prisma.url.findFirst({
      where: {
        id: urlId,
      },
    })

    if (!url) {
      throw new ConflictException('URl not exists')
    }

    await this.prisma.url.update({
      where: {
        id: urlId,
      },
      data: {
        original_url: newdestinyUrl,
      },
    })
  }
}
