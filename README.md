# YourWay

## Sobre o Projeto

O **YourWay** é uma aplicação web desenvolvida em React que simula uma plataforma de compras online, permitindo aos usuários navegar por produtos, gerenciar informações pessoais, adicionar itens ao carrinho e finalizar pedidos através de um processo de checkout com pagamento simulado via QR Code.

O projeto foi desenvolvido como atividade acadêmica das disciplinas de **Construção de Frontend** e **Manutenção de Software e DevOps**, aplicando conceitos de desenvolvimento frontend moderno, integração com APIs REST, autenticação de usuários, persistência de dados e práticas de DevOps.

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

---

## Estrutura das Principais Páginas

### Login

Permite que usuários autenticados acessem a plataforma.

### Cadastro

Permite o registro de novos usuários.

### Home

Página inicial com acesso aos produtos disponíveis.

### Lista de Produtos

Exibe os produtos disponíveis para compra.

### Produto

Apresenta os detalhes de um produto específico.

### Carrinho

Gerenciamento dos produtos selecionados pelo usuário.

### Checkout

Finalização da compra e geração do QR Code de pagamento simulado.

### Perfil

Permite visualizar e atualizar informações da conta.

---

## Banco de Dados

O projeto utiliza o **Firebase Firestore** para armazenamento das informações dos usuários.

### Dados armazenados

* Nome do usuário;
* E-mail;
* Informações de autenticação;
* Dados necessários para gerenciamento da conta.

---

## API Utilizada

Os dados dos produtos são obtidos através da **MockAPI**, utilizada para simular uma API REST durante o desenvolvimento da aplicação.

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
cd TRABALHO-FRONTEND
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

## Integração Contínua e Entrega Contínua (CI/CD)

O projeto utiliza GitHub Actions para automatização dos processos de integração contínua.

As automações incluem:

* Instalação automática das dependências;
* Verificação de qualidade do código;
* Execução de testes;
* Processo de build da aplicação;
* Preparação para deploy automatizado.

---

## Equipe

* Amanda Soares
* Felipe Gripp
* Julia de Souza
* Mariana Kanashiro

---

## Considerações Finais

O desenvolvimento do YourWay permitiu aplicar conceitos de frontend moderno, integração com APIs REST, autenticação de usuários, persistência de dados em nuvem, containerização com Docker e práticas de DevOps, proporcionando experiência prática em um cenário próximo ao desenvolvimento de aplicações reais.
