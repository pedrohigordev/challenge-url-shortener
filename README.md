## Challenge teddy

### 🚀 Começando

### 📋 Pré-requisitos obrigatórios

- **[Node.JS](https://www.python.org/downloads/release/python-392/)**
- **[Docker](https://docs.docker.com/desktop/)** e **[Docker Compose](https://docs.docker.com/compose/)**
- **[Git](https://git-scm.com/)**
- **[NVM](https://github.com/nvm-sh/nvm)**

## Sobre o projeto
### Arquitetura: Clean Architecture

## ⚙️ Executando o projeto

OBS: Para evitar trabalho por parte do avaliador, decidi enviar as credenciais diretamente, pois criar a chave publica e cave privada pode gerar um tempo a mais.

Crie um arquivo .env na raiz do projeto, com as seguintes credenciais:

````
PORT=3333
URL_STANDART="http://localhost:3333"
DATABASE_URL="postgres://teddy-postgres:teddy@2024@localhost:5432/shortener-db?schema=public"
JWT_PRIVATE_KEY="LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRQ1ZqektwaVpaSFhTdkkKVzBLajZlQ1RYWHhjVEhVbFNjL0RZSVU5KzZoN0h6cCtzTDlGVkMwblA4QlY3VGFvb2ZxSUptRGJrTXBIdlBFcQpIRmk5Ums3S2FwRUJlRjZSc2c0dVJFL0R5Q0tHRURlbjdPcVN3cEJuSGpHTU91UzVYcHRPanJxZ2RGUUZ1eDMxCnJEYmdocWY5N2hqWkxNY0lWR2NnQTBwMitWUnQ1ak9ERGlEUEwwZ0pNWXd5VDU4RUNaYzdteHdGRW9IUDhiVjMKOXJLdTBjaUh2YUI5WUNaT1QzdDF0bjNJSWRUS252amVhaCtGZHFnN09PcTdSMEV0c2ZOU3hERG5BYnA4V3FuRApQdk1lZGFnZC90ZUhDTnJLSEtnVHpTeGltaXNoL1RuTlQ4a29rT1M4WERQSjZUQUM2dVE0eVRsSjFjQjFtQm1KClJQQzhWSUU3QWdNQkFBRUNnZ0VBSmYrakJKWXplMkE5dm9NSlZISVluL2h4bjFYQnNiNm1MZUs1RjcxMzJnaGUKS1ZBbzJLbUJhMlowTEtDL2NXcnVKMmR3MW5oY0hJdnh6aHd6bzZ0WVcyOWw5alNwK21SOTI5MTVVcW5uczU0dApOZG9vNHk3UjE1RkJUM3FySURuY1JjSlh3bXFyNm1UWFFOTUhnbFpVR2wxRExQS0dneVJHcTBpS3c5Mm5TT0IvCnA3N3h2Y1ZudE9Pek9MZTZ4djVqdDBSeEJ4SlllOU1CUXcyVzZqcDM0eFF0Z1Q0OUtkWFRpenZlM2pnT2FBRTYKM3hrU1pBZ1RvRytrQ3puTmNhdXhzVG5wczhMWE1NWTgvUlIvQXErVUU3UE5lSGpEem40OEJwRVRsdHIybTR1TQpaV2lFcW9PNDdER0hkMDBPcXliRmVyQU8vR0VDRW9yUGo5K0ZnL21ya1FLQmdRREdQN05tWFRHbWpUdFlLQVM5Cmc0L2JKWVpzaW4yNDZKenVTYjJvQXd3RTZPMFlDeWRXVHp4Y1czY0FRZGM3M2hpL1MxMmlFMURoMmhBazdweUgKVzR6SSt3Tlp4STZXUG84NFNFRDBXU0RsVkhWVTdqMGVlM0p0amtUSWFFdloxdG1nV0NiQnRrc2RNY0UrTkM2TApRcWgrWnNjYXhGZ2trTlBwNEhoWWxyR25jd0tCZ1FEQklJRzEzam1CeHc5Ry9aQXVhTHdjVmVuQlpjWVk5SzhkCjgveVcveFN0N3hsV1lXZjlqTHdzVXRteHk5eXBFTy9GdlAyOUNIVFY2a3VXb2ZseXVONFJmN2V4bEcxNEdYMHcKNHpGWUw1TXJZQlhzSDNVQkJ2RklCZ0FJT1YwS0JtMmcybnF1Z1RINGJ2aHc4N3hkcitUcFQ1djU5RXRmcWRaKwoyNmdXNHVoOUdRS0JnRWdOWU51RVpZWTk4R0tpOE00Y0ljMnBQc2oyTUtsaXlaNkZhSXZHeDdpRkc1N1FkdlNVCmljQ2JjWTNEWUVHZS8rbU9yN0kzU1A4ODdQOHZSZTZnSkhQclh4VmlMZHlIVWpCSGVtd1VkTE5FMWZ3UE5tRjgKeG1MeEFTakJWMGdPSVR4NHJXVmNKc0t1a2FoVStOR2VZWFRIVC9mM2duMlBzYVZmOHYxbmo1dm5Bb0dBSGtnZQpqb205c3ArbndaWFltYTVLY0piNEJCOFZKS3laR0xVOUVlQUZPaENYaEhmWmVtUXF6VGhnY2dScElRbEt6MUtHCjVyRUF3Tm52NkRxVmhtdCtSbmdrTVcvNGlqQlU5T2xxdjAwV1ltSzZqVCtSZFF2Rm9XbHZiOXF1di9lcUVPS3gKQWRPNEppQWdUSFdyUDNWcEN6dzBWTWo5V0k2azExZFJ6K1RjVjJFQ2dZRUFpUFpVWGdIcjZrcHhCOWpMdDVXeQpHOEhROUpEeUpVa1lyTmNGWWNYS05JeVNnZHZMWStDb0JVWjJWemFaTGxoV2ZuS2xkZFVzRVdhUXJyMkhqdHEwCk55bEFRTEVXQ2hRbmdKWWgvTDl3RlNXOHFXMUduazVjWFdtUHo2TkU3ZkJHRXhxMmNRUFJMdmw1Y1lFRHQzd1EKY2lPK3JZU3Z0U053Vm9jZHk4SE4zdFE9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K"

JWT_PUBLIC_KEY="LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFsWTh5cVltV1IxMHJ5RnRDbytuZwprMTE4WEV4MUpVblB3MkNGUGZ1b2V4ODZmckMvUlZRdEp6L0FWZTAycUtINmlDWmcyNURLUjd6eEtoeFl2VVpPCnltcVJBWGhla2JJT0xrUlB3OGdpaGhBM3ArenFrc0tRWng0eGpEcmt1VjZiVG82Nm9IUlVCYnNkOWF3MjRJYW4KL2U0WTJTekhDRlJuSUFOS2R2bFViZVl6Z3c0Z3p5OUlDVEdNTWsrZkJBbVhPNXNjQlJLQnovRzFkL2F5cnRISQpoNzJnZldBbVRrOTdkYlo5eUNIVXlwNzQzbW9maFhhb096anF1MGRCTGJIelVzUXc1d0c2ZkZxcHd6N3pIbldvCkhmN1hod2pheWh5b0U4MHNZcG9ySWYwNXpVL0pLSkRrdkZ3enlla3dBdXJrT01rNVNkWEFkWmdaaVVUd3ZGU0IKT3dJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg=="

````

Para executar o projeto com a versão correta do nodejs, execute na raiz do projeto o comando:
```
nvm install
```

Após isso, inicialize o banco de dados com o comando:

```
docker compose up -d 
```

Agora precisamos executar as migrations do prisma, e para isso vamos utilizar o comando:

- OBS: Caso esteja utilizando algum gerenciador de pacotes diferente do PNPM, basta trocar pnpm pelo seu gerenciador de pacotes

```
pnpm prisma migrate dev
```

Para executar o projeto, utilize o comando:

```
pnpm run start:dev
```

### Testes
### Os testes podem ser realizados utilizando o REST CLIENT:

- **[Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)**

Após a instalação da extensão, acesse o arquivo: client.http que está na raiz do projeto

#### Testes E2E
Para a execução dos testes E2E deve-se rodar os testes com o comando: 
- OBS: Caso esteja utilizando algum gerenciador de pacotes diferente do PNPM, basta trocar pnpm pelo seu gerenciador de pacotes

```
pnpm run test:e2e
```

# RF

- [x] O usuário deve poder criar uma conta;
- [x] O usuário deve poder se autenticar;
- [x] O usuário autenticado deve poder listar todas as urls registradas que não foram deletadas;
- [x] O usuário autenticado deve poder deletar as urls
- [x] O usuário deve poder acessar uma Url encurtada e ser redirecionado para a url de origem;
- [x] O usuário autenticado deve atualizar a url de origem da sua url encurtada

# RN

- [x] Na listagem de urls, não podem ser exibidas urls deletadas;
- [x] Deve ser possível identificarmos o usuário entre as requisições;
- [x] O usuário só pode visualizar urls o qual ele criou;
- [x] O registro não é deletado do banco e sim é somente atualizado o campo deletedAt

<!--START_SECTION:footer-->

<br />
<br />

<p align="center">
  <h2>Acesse o documento do desafio</h2>
  <a href="https://docs.google.com/document/d/1eZpPju0EHUO5tzGgi3J3G0dtGX8G9i6eh1FU39WYg2M/edit#heading=h.7smh7sn2jj7n" target="_blank">
    <img align="center" src="https://teddydigital.io/wp-content/uploads/2023/10/logo-preto-2048x992.png" alt="documento do google docs"/>
  </a>
</p>

<!--END_SECTION:footer-->
