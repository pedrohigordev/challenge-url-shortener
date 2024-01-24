import {
  Controller,
  Delete,
  HttpCode,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

import { ZoodValidationPipe } from '../pipes/zod-validation-pipe'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { DeleteUrlUseCase } from '@/domain/user/application/use-cases/delete-urls'

const deleteUrlQuerySchema = z.object({
  urlId: z.string(),
})

type DeleteUrlQuerySchema = z.infer<typeof deleteUrlQuerySchema>
@ApiTags('Delete shortened url controller')
@Controller('/shorten')
@UseGuards(JwtAuthGuard)
@UsePipes(new ZoodValidationPipe(deleteUrlQuerySchema))
export class DeleteUrlController {
  constructor(private deleteUrl: DeleteUrlUseCase) {}

  @Delete()
  @ApiOperation({
    summary: 'Using this route it is possible to delete a created URL',
  })
  @HttpCode(204)
  @UsePipes(new ZoodValidationPipe(deleteUrlQuerySchema))
  async handle(@Query() query: DeleteUrlQuerySchema) {
    const { urlId } = query

    return await this.deleteUrl.execute({
      urlId,
    })
  }
}
