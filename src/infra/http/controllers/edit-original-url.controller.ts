import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZoodValidationPipe } from '../pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger'

const editUrlBodySchema = z.object({
  urlId: z.string(),
  newdestinyUrl: z.string().url(),
})

type EditUrlBodySchema = z.infer<typeof editUrlBodySchema>
@ApiTags('Edit URL controller')
@Controller('/shorten')
@UseGuards(JwtAuthGuard)
@UsePipes(new ZoodValidationPipe(editUrlBodySchema))
export class EditUrlController {
  constructor(private prisma: PrismaService) {}

  @Put()
  @HttpCode(200)
  @UsePipes(new ZoodValidationPipe(editUrlBodySchema))
  async handle(@Body() body: EditUrlBodySchema) {
    const { urlId, newdestinyUrl } = body

    const url = await this.prisma.url.findFirst({
      where: {
        id: urlId,
        deletedAt: {
          equals: null,
        },
      },
    })

    if (!url) {
      throw new NotFoundException('URl not exists')
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
