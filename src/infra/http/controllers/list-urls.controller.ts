import { ListUrlUseCase } from '@/domain/user/application/use-cases/list-urls'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
@ApiTags('List URls controller')
@Controller('/shorten')
@UseGuards(JwtAuthGuard)
export class ListUrlsController {
  constructor(private listUrls: ListUrlUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@CurrentUser() user: UserPayload) {
    const result = await this.listUrls.execute(user.sub)

    return result
  }
}
