FROM node:18.13.0-alpine

WORKDIR /app

RUN npm install -g pnpm

RUN mkdir -p /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY .env /app

COPY prisma/*.prisma /app/prisma/

RUN npx prisma generate --schema /app/prisma/schema.prisma
RUN npx prisma migrate dev

COPY . .

RUN npm run build

EXPOSE 3333

CMD [ "pnpm", "start:dev" ]