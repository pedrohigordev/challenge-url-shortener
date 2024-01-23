import 'dotenv/config'

import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { execSync } from 'child_process'

const prisma = new PrismaClient()

function generateDatabase(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not found.')
  }
  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaUUID = randomUUID()

beforeAll(async () => {
  const databaseURL = generateDatabase(schemaUUID)

  process.env.DATABASE_URL = databaseURL

  execSync('pnpm prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS "${schemaUUID}" CASCADE`,
  )

  await prisma.$disconnect()
})
