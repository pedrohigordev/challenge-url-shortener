import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZoodValidationPipe } from '../pipes/zod-validation-pipe'
import { Public } from '@/infra/auth/public'
import { UserAlreadyExistsError } from '@/domain/user/application/use-cases/errors/users-already-exists-error'
import { RegisterUserUseCase } from '@/domain/user/application/use-cases/register-users'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@ApiTags('Create Account Controller')
@Public()
export class CreateAccountController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post()
  @ApiOperation({
    summary:
      'Here it will be possible to create a user, using name, email and password',
  })
  @ApiResponse({ status: 201, description: 'Success' })
  @HttpCode(201)
  @UsePipes(new ZoodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.registerUser.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
