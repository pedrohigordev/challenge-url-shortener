import {
  Body,
  Controller,
  HttpCode,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZoodValidationPipe } from '../pipes/zod-validation-pipe'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { UpdateUrlUseCase } from '@/domain/user/application/use-cases/update-urls'

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
  constructor(private updateUrls: UpdateUrlUseCase) {}

  @Put()
  @HttpCode(200)
  @UsePipes(new ZoodValidationPipe(editUrlBodySchema))
  async handle(@Body() body: EditUrlBodySchema) {
    const { urlId, newdestinyUrl } = body

    await this.updateUrls.execute({
      urlId,
      newdestinyUrl,
    })
  }
}
