import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { z } from 'zod'
import { ZoodValidationPipe } from '../pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@ApiTags('Authenticate Controller')
@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZoodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const accessToken = this.jwt.sign({ sub: user.id })

    return {
      access_token: accessToken,
    }
  }
}