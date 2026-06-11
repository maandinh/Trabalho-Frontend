# YourWay

## Sobre o Projeto

O **YourWay** é uma aplicação web desenvolvida em React que simula uma plataforma de compras online, permitindo aos usuários navegar por produtos, gerenciar informações pessoais, adicionar itens ao carrinho e finalizar pedidos através de um processo de checkout com pagamento simulado via QR Code.

---

## Objetivos do Projeto

Este projeto teve como objetivo aplicar conceitos de desenvolvimento web moderno através da implementação de:

* Navegação entre páginas utilizando React Router;
* Formulários com validação de dados;
* Gerenciamento de estado da aplicação;
* Integração com API REST;
* Autenticação e gerenciamento de usuários;
* Persistência de dados utilizando Firebase;
* Containerização com Docker;
* Configuração de ambiente com Docker Compose;
* Aplicação de práticas DevOps;
* Automação de processos utilizando GitHub Actions (CI/CD).

---

## Funcionalidades

### Autenticação

* Cadastro de usuários;
* Login com e-mail e senha;
* Recuperação de senha;
* Gerenciamento de sessão do usuário.

### Gerenciamento de Perfil

* Visualização dos dados do usuário;
* Alteração de informações cadastradas.

### Catálogo de Produtos

* Listagem de produtos;
* Visualização dos detalhes dos produtos;
* Consumo de dados através da MockAPI.

### Carrinho de Compras

* Adição de produtos ao carrinho;
* Remoção de produtos do carrinho;
* Gerenciamento dos itens selecionados.

### Checkout

* Resumo da compra;
* Simulação de pagamento por QR Code;
* Finalização do pedido.

### Área Protegida

* Acesso restrito a usuários autenticados;
* Proteção de rotas para funcionalidades específicas.

---

## Tecnologias Utilizadas

### Frontend

* React
* Vite
* React Router DOM
* Axios
* CSS

### Backend e Serviços

* Firebase Authentication
* Firebase Firestore
* MockAPI

### DevOps

* Docker
* Docker Compose
* GitHub
* GitHub Actions

### Tests

* Jest + Supertest

---

## Instalação do Projeto

### Pré-requisitos

* Node.js
* npm
* Docker
* Docker Compose

### Clonando o repositório

```bash
git clone https://github.com/maandinh/Trabalho-Frontend.git
cd Trabalho-Frontend
```

### Instalação das dependências

```bash
npm install
```

### Execução em ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

---

## Execução com Docker

### Construção e inicialização dos containers

```bash
docker compose up -d
```

### Encerramento dos containers

```bash
docker compose down
```

---

## Equipe

* Amanda Soares
* Felipe Gripp
* Julia de Souza
* Mariana Kanashiro

---

## Considerações Finais

O desenvolvimento do YourWay permitiu aplicar conceitos de frontend moderno, integração com APIs REST, autenticação de usuários, persistência de dados em nuvem, containerização com Docker e práticas de DevOps, proporcionando experiência prática em um cenário próximo ao desenvolvimento de aplicações reais.
