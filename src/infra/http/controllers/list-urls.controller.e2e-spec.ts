import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import request from 'supertest'

describe('List URLs (E2E)', () => {
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

  test('List Urls', async () => {
    const userId = randomUUID()

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
        id: randomUUID(),
        original_url: 'https://google.com.br/accounts',
        hash: 'gBtyar',
        userId,
      },
    })

    await prisma.url.create({
      data: {
        id: randomUUID(),
        original_url: 'https://google.com.br/accounts',
        hash: 'UtYakj',
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
      .get('/shorten')
      .set('Authorization', `Bearer ${authentication.body.access_token}`)

    expect(response.body.length).toEqual(2)
  })
})
