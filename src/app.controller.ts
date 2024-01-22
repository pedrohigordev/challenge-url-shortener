import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'

@Controller('/api/v1/url-shortener-teddy/')
export class AppController {
  constructor(
    private appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get('/hello')
  async getHello() {
    return await this.prisma.user.findMany()
  }
}
