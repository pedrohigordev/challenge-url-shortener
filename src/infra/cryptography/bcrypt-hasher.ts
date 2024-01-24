import { HashComparer } from '@/domain/user/application/cryptography/hash-compase'
import { HashGenerator } from '@/domain/user/application/cryptography/hash-generator'
import { hash, compare } from 'bcryptjs'

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
