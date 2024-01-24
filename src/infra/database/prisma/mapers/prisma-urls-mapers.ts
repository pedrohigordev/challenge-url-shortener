import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Url } from '@/domain/user/enterprise/entities/Url'
import { Url as PrismaUrl, Prisma } from '@prisma/client'

export class PrismaUrlMapper {
  static toDomain(raw: PrismaUrl): Url {
    return Url.create(
      {
        originalUrl: raw.original_url,
        hash: raw.hash,
        userId: raw.hash,
      },

      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(url: Url): Prisma.UrlUncheckedCreateInput {
    return {
      id: url.id.toString(),
      original_url: url.original_url.toString(),
      hash: url.hash.toString(),
      userId: url.userId.toString(),
    }
  }
}
