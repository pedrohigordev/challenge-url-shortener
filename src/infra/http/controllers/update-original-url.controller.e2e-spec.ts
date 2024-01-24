import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import request from 'supertest'

describe('Edit original URL (E2E)', () => {
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

  test('[put] /shorten', async () => {
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
      .put('/shorten')
      .set('Authorization', `Bearer ${authentication.body.access_token}`)
      .send({
        urlId,
        newdestinyUrl: 'https://docs.nestjs.com/',
      })

    const findUrlUpdated = await prisma.url.findFirst({
      where: {
        original_url: 'https://docs.nestjs.com/',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(findUrlUpdated).toBeDefined()
    expect(findUrlUpdated?.original_url).toBe('https://docs.nestjs.com/')
  })
})
