import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import request from 'supertest'

describe('Access shortened url (E2E)', () => {
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

    const response = await request(app.getHttpServer()).get(`/gBtyar`)

    console.log(response.statusCode)

    const numberOfVisits = await prisma.url.findFirst({
      where: {
        id: urlId,
      },
      select: {
        visits: true,
      },
    })

    console.log(numberOfVisits?.visits)

    expect(response.statusCode).toBe(200)
    expect(numberOfVisits?.visits).toEqual(1)
  })
})
