# 👟 Kickslabs

## 👥 Integrantes

- Bruno Souza
- Guilherme
- Leonardo
- Pedro

---

## 📋 Sobre o projeto

O Kickslabs é uma aplicação Full Stack voltada para o gerenciamento de uma loja de tênis.

O sistema permite cadastrar e gerenciar usuários, categorias e produtos, além de realizar pedidos de produtos com controle automático de estoque.

O projeto foi desenvolvido com o objetivo de aplicar conceitos de desenvolvimento de APIs REST, banco de dados relacionais, arquitetura em camadas, validação de dados, segurança e regras de negócio.

---

# 🚀 Tecnologias utilizadas

## Backend

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- Zod
- bcryptjs
- dotenv

## Ferramentas

- Git
- GitHub
- Visual Studio Code
- Thunder Client

---

# 🏗️ Arquitetura do Backend

O backend utiliza uma arquitetura organizada em camadas:

```text
src/
├── controllers/
├── database/
├── dtos/
├── errors/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
└── server.ts
```

### Responsabilidade das camadas

**Models**

Representam as entidades e seus relacionamentos com o banco de dados.

**DTOs**

Definem e validam os dados recebidos pela API utilizando Zod.

**Controllers**

Recebem as requisições HTTP e encaminham as operações para os Services.

**Services**

Contêm as regras de negócio da aplicação.

**Routes**

Definem os endpoints da API.

**Middlewares**

Realizam funções intermediárias, como o tratamento global de erros.

**Errors**

Contêm as classes utilizadas para representar erros específicos da aplicação.

**Utils**

Contêm funções auxiliares utilizadas pelas regras de negócio.

**Database**

Contém a configuração da conexão entre TypeORM e PostgreSQL.

---

# 🗄️ Banco de dados

O projeto utiliza PostgreSQL como banco de dados e TypeORM para comunicação com a aplicação.

O banco possui as seguintes entidades:

```text
User
 │
 │ 1:N
 ▼
Order
 │
 │ 1:N
 ▼
OrderItem
 │
 │ N:1
 ▼
Product
 │
 │ N:1
 ▼
Category
```

## Entidades

### User

Representa os usuários cadastrados no sistema.

Principais campos:

- id
- name
- email
- password
- createdAt

As senhas são armazenadas utilizando hash com bcryptjs.

### Category

Representa as categorias dos produtos.

Principais campos:

- id
- name

### Product

Representa os produtos vendidos pela loja.

Principais campos:

- id
- name
- description
- price
- stock
- image
- categoryId

Cada produto pertence a uma categoria.

### Order

Representa um pedido realizado por um usuário.

Principais campos:

- id
- total
- status
- userId

### OrderItem

Representa os produtos pertencentes a um pedido.

Principais campos:

- id
- quantity
- unitPrice
- subtotal
- orderId
- productId

O preço unitário é armazenado no momento da compra para preservar o valor original do produto no pedido.

---

# 📦 Funcionalidades

## Usuários

- Cadastro de usuários
- Consulta de usuários
- Consulta de usuário por ID
- Atualização de usuários
- Exclusão de usuários
- Validação dos dados
- Verificação de e-mail duplicado
- Hash seguro das senhas

## Categorias

- Cadastro de categorias
- Consulta de categorias
- Consulta de categoria por ID
- Atualização de categorias
- Exclusão de categorias
- Validação de dados
- Verificação de categorias inexistentes

## Produtos

- Cadastro de produtos
- Consulta de produtos
- Consulta de produto por ID
- Atualização de produtos
- Exclusão de produtos
- Associação de produtos a categorias
- Controle de estoque
- Validação dos dados

## Pedidos

- Criação de pedidos
- Consulta de pedidos
- Consulta de pedido por ID
- Exclusão de pedidos
- Cálculo automático do total
- Cálculo de subtotal dos itens
- Controle automático de estoque
- Validação da existência do usuário
- Validação da existência dos produtos
- Verificação de estoque disponível

---

# 💼 Regras de negócio

O sistema possui regras específicas relacionadas ao funcionamento de uma loja de tênis.

### Controle de estoque

Ao realizar uma compra, o estoque do produto é reduzido automaticamente de acordo com a quantidade comprada.

Exemplo:

```text
Estoque inicial: 10
Quantidade comprada: 2
Estoque final: 8
```

### Estoque insuficiente

O sistema impede que um usuário compre uma quantidade maior do que o estoque disponível.

Nesse caso, a API retorna:

```text
409 Conflict
```

### Cálculo do pedido

O preço dos produtos é obtido diretamente do banco de dados.

O cliente não envia o preço ou o total do pedido.

Exemplo:

```text
Produto: Nike Air
Preço: R$ 599,00
Quantidade: 2

Subtotal: R$ 1.198,00
Total: R$ 1.198,00
```

### Histórico de preço

O `OrderItem` armazena o preço unitário utilizado no momento da compra.

Assim, alterações futuras no preço do produto não alteram pedidos antigos.

---

# 🔐 Segurança

As senhas dos usuários não são armazenadas em texto puro.

O sistema utiliza:

```text
bcryptjs
```

para gerar o hash das senhas.

Além disso, a senha não é retornada nas respostas da API.

---

# ⚠️ Tratamento de erros

A aplicação possui um sistema centralizado de tratamento de erros.

São utilizados:

- `AppError`
- `ZodError`
- Middleware global de erros

Principais códigos utilizados:

```text
200 → Operação realizada com sucesso
201 → Recurso criado
204 → Operação realizada sem conteúdo
404 → Recurso não encontrado
409 → Conflito
422 → Dados inválidos
500 → Erro interno do servidor
```

---

# ⚙️ Configuração do ambiente

## Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

- Node.js
- PostgreSQL
- Git

---

## 📥 Instalação

Clone o repositório:

```bash

```

Entre na pasta:

```bash
cd kickslabs-backend
```

Instale as dependências:

```bash
npm install
```

---

# 🗄️ Configuração do PostgreSQL

Crie um banco de dados chamado:

```text
kickslabs
```

Depois configure as variáveis de ambiente.

Crie um arquivo:

```text
.env
```

com:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
DB_NAME=kickslabs
```

O arquivo `.env` não deve ser enviado para o GitHub.

Utilize o `.env.example` como referência.

---

# ▶️ Executando o Backend

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Quando estiver funcionando, será exibido:

```text
Banco de dados conectado!
Servidor rodando na porta 3000
```

A API estará disponível em:

```text
http://localhost:3000
```

---

# 🔌 API REST

## Users

### Criar usuário

```http
POST /users
```

Exemplo:

```json
{
  "name": "Beckham",
  "email": "beckham@kickslabs.com",
  "password": "123456"
}
```

### Listar usuários

```http
GET /users
```

### Buscar usuário

```http
GET /users/:id
```

### Atualizar usuário

```http
PUT /users/:id
```

### Excluir usuário

```http
DELETE /users/:id
```

---

## Categories

### Criar categoria

```http
POST /categories
```

Exemplo:

```json
{
  "name": "Tênis"
}
```

### Listar categorias

```http
GET /categories
```

### Buscar categoria

```http
GET /categories/:id
```

### Atualizar categoria

```http
PUT /categories/:id
```

### Excluir categoria

```http
DELETE /categories/:id
```

---

## Products

### Criar produto

```http
POST /products
```

Exemplo:

```json
{
  "name": "Nike Air",
  "description": "Tênis Nike Air confortável para uso diário.",
  "price": 599.00,
  "stock": 10,
  "image": "https://exemplo.com/nike-air.jpg",
  "categoryId": 3
}
```

### Listar produtos

```http
GET /products
```

### Buscar produto

```http
GET /products/:id
```

### Atualizar produto

```http
PUT /products/:id
```

### Excluir produto

```http
DELETE /products/:id
```

---

## Orders

### Criar pedido

```http
POST /orders
```

Exemplo:

```json
{
  "userId": 2,
  "items": [
    {
      "productId": 2,
      "quantity": 2
    }
  ]
}
```

O preço e o total são calculados automaticamente pelo backend.

### Listar pedidos

```http
GET /orders
```

### Buscar pedido

```http
GET /orders/:id
```

### Excluir pedido

```http
DELETE /orders/:id
```

---

# 🔄 Fluxo da aplicação

```text
Frontend
   │
   │ HTTP
   ▼
Express / API REST
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
TypeORM
   │
   ▼
PostgreSQL
```

---

# 📌 Observações

O frontend deverá consumir exclusivamente os endpoints disponibilizados por esta API.

Os dados apresentados na interface deverão ser obtidos através das requisições realizadas ao backend.

---

# 👨‍💻 Projeto acadêmico

Projeto desenvolvido como parte da Unidade Curricular de Desenvolvimento Full Stack.

**Kickslabs — Sistema de gerenciamento de loja de tênis.**