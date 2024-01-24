I
## Challenge teddy

## 🚀 Começando

### 📋 Pré-requisitos obrigatórios

- **[Node.JS](https://www.python.org/downloads/release/python-392/)**
- **[Docker](https://docs.docker.com/desktop/)** e **[Docker Compose](https://docs.docker.com/compose/)**
- **[Git](https://git-scm.com/)**

## ⚙️ Executando o projeto

Após realizar o download, você deve navegar até a pasta raíz do projeto e inicializar o banco de dados com o comando

```
docker compose up -d 
```

### Testes
### Os testes podem ser realizados utilizando o REST CLIENT:

- **[Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)**

#### Testes E2E
Para a execução dos testes E2E deve-se rodar os testes com o comando: 

```` cmd command ``

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
  <a href="https://docs.google.com/document/d/1eZpPju0EHUO5tzGgi3J3G0dtGX8G9i6eh1FU39WYg2M/editt" target="_blank">
    <img align="center" src="https://teddydigital.io/wp-content/uploads/2023/10/logo-preto-2048x992.png" alt="documento do google docs"/>
  </a>
</p>

<!--END_SECTION:footer-->