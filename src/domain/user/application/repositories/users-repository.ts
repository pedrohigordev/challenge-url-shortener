import { User } from '../../enterprise/entities/User'

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>
  abstract create(user: User): Promise<void>
}
