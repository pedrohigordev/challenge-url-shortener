import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UsersRepository } from '@/domain/user/application/repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { UrlsRepository } from '@/domain/user/application/repositories/urls-repository'
import { PrismaUrlsRepository } from './prisma/repositories/prisma-urls-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: UrlsRepository,
      useClass: PrismaUrlsRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, UrlsRepository],
})
export class DatabaseModule {}
