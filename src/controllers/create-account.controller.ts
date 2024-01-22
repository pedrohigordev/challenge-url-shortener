import { Controller, HttpCode, Post } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle() {
    const name = 'Pedro Sousa'
    const email = 'pedro.sousa@gmail.com'
    const password = '123456'

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  }
}
