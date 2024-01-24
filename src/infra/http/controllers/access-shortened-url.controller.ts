import { AccessUrlUseCase } from '@/domain/user/application/use-cases/access-urls'
import { Controller, Get, HttpCode, Param, Res } from '@nestjs/common'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Access to URL controller')
@Controller('/')
export class AccessUrlShortenedController {
  constructor(private accessurl: AccessUrlUseCase) {}

  @Get(':hash')
  @HttpCode(200)
  async handle(@Param('hash') hash: string, @Res() res: Response) {
    const result = await this.accessurl.execute(hash)

    res.redirect(301, result)
  }
}
