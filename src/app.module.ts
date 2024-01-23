import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { UrlShortenerController } from './controllers/url-shortener.controller'
import { EditUrlController } from './controllers/edit-original-url.controller'
import { DeleteUrlController } from './controllers/delete-url-shortened.controller'
import { ListUrlsController } from './controllers/list-urls.controller'
import { AccessUrlShortenedController } from './controllers/access-shortened-url.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    UrlShortenerController,
    EditUrlController,
    DeleteUrlController,
    ListUrlsController,
    AccessUrlShortenedController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
