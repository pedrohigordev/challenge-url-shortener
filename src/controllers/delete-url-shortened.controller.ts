import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import { ZoodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

const deleteUrlQuerySchema = z.object({
  urlId: z.string(),
})

type DeleteUrlQuerySchema = z.infer<typeof deleteUrlQuerySchema>

@Controller('/shorten')
@UseGuards(JwtAuthGuard)
@UsePipes(new ZoodValidationPipe(deleteUrlQuerySchema))
export class DeleteUrlController {
  constructor(private prisma: PrismaService) {}

  @Delete()
  @HttpCode(201)
  @UsePipes(new ZoodValidationPipe(deleteUrlQuerySchema))
  async handle(@Query() query: DeleteUrlQuerySchema) {
    const { urlId } = query

    const url = await this.prisma.url.findFirst({
      where: {
        id: urlId,
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
        deletedAt: new Date(),
      },
    })
  }
}