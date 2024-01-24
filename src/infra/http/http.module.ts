import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { UrlShortenerController } from './controllers/url-shortener.controller'
import { EditUrlController } from './controllers/edit-original-url.controller'
import { DeleteUrlController } from './controllers/delete-url-shortened.controller'
import { ListUrlsController } from './controllers/list-urls.controller'
import { AccessUrlShortenedController } from './controllers/access-shortened-url.controller'
import { DatabaseModule } from '../database/database.module'
import { RegisterUserUseCase } from '@/domain/user/application/use-cases/register-users'
import { CryptographyModule } from '../cryptography/cryptography.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    UrlShortenerController,
    EditUrlController,
    DeleteUrlController,
    ListUrlsController,
    AccessUrlShortenedController,
  ],
  providers: [RegisterUserUseCase],
})
export class HttpModule {}
