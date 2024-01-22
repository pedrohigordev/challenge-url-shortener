import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller('/api/v1/url-shortener-teddy/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello()
  }
}
