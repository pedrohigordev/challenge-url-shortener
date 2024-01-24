import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import request from 'supertest'

describe('Delete URL shortened (E2E)', () => {
  let app: INestApplication

  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[DELETE] /shorten', async () => {
    const userId = randomUUID()
    const urlId = randomUUID()

    await prisma.user.create({
      data: {
        id: userId,
        name: 'Fulano Sousa',
        email: 'fulano@gmail.com',
        password: await hash('123456', 8),
      },
    })

    await prisma.url.create({
      data: {
        id: urlId,
        original_url: 'https://google.com.br/accounts',
        hash: 'gBtyar',
        userId,
      },
    })

    const authentication = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'fulano@gmail.com',
        password: '123456',
      })

    const response = await request(app.getHttpServer())
      .delete('/shorten')
      .set('Authorization', `Bearer ${authentication.body.access_token}`)
      .query({
        urlId,
      })

    const findUrlDeleted = await prisma.url.findFirst({
      where: {
        id: urlId,
        deletedAt: {
          equals: null,
        },
      },
    })

    expect(response.statusCode).toBe(204)
    expect(findUrlDeleted).toBeNull()
  })
})
