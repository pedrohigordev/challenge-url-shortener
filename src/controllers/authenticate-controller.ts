import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

// const createAccountBodySchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   password: z.string(),
// })

@Controller('/sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  //   @UsePipes(new ZoodValidationPipe(createAccountBodySchema))
  async handle() {
    const token = this.jwt.sign({
      sub: 'user-id',
    })

    return token
  }
}
