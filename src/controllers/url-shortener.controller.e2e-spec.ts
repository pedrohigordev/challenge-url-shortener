import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import request from 'supertest'

describe('Shorten a URL (E2E)', () => {
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

  test('Shorten a URL', async () => {
    const userId = randomUUID()

    await prisma.user.create({
      data: {
        id: userId,
        name: 'Fulano Sousa',
        email: 'fulano@gmail.com',
        password: await hash('123456', 8),
      },
    })

    const authentication = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'fulano@gmail.com',
        password: '123456',
      })

    const response = await request(app.getHttpServer())
      .post('/shorten')
      .send({
        url: 'http://google.com.br/accunts/devoices/manager',
      })
      .set('Authorization', `Bearer ${authentication.body.access_token}`)

    const hashCode = response.body.shortened_url.split('/')
    const code = hashCode[hashCode.length - 1]

    await request(app.getHttpServer()).get(`/${code}`)

    const numberOfVisits = await prisma.url.findFirst({
      where: {
        hash: code,
      },
      select: {
        visits: true,
      },
    })

    expect(response.statusCode).toBe(201)
    expect(numberOfVisits?.visits).toEqual(1)
  })
})
