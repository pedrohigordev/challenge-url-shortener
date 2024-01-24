import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env/env'
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })

  const config = new DocumentBuilder()
    .setTitle('URL Shortener')
    .setDescription('API developed to shorten URLS')
    .setVersion('1.0')
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  }

  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('api/doc', app, document)

  await app.listen(port)
}

bootstrap()
