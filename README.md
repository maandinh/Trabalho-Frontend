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

## Testes

O projeto possui testes automatizados para validar o funcionamento das rotas e funcionalidades da aplicação.

### Tecnologias utilizadas nos testes

- Vitest
- Supertest

---

### Executar todos os testes

```bash
npm test
```

ou

```bash
npm run test
```

### Executar testes uma única vez

```bash
npm run test:run
```

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

## Integração Contínua e Entrega Contínua (CI/CD)

O projeto utiliza GitHub Actions para automatização dos processos de integração contínua.

As automações incluem:

* Instalação automática das dependências;
* Verificação de qualidade do código;
* Execução de testes;
* Processo de build da aplicação;
* Preparação para deploy automatizado.

---

## Correções e Melhorias Implementadas

Durante o desenvolvimento do projeto foram identificados e corrigidos diversos problemas relacionados à arquitetura da aplicação, infraestrutura e validação de dados.

### Refatoração do Contexto de Autenticação

Inicialmente, as implementações de `AuthProvider`, `AuthContext` e `useAuth` estavam concentradas em um único arquivo, o que gerava conflitos e dificultava a manutenção do código.

Como melhoria, a estrutura foi reorganizada, separando cada responsabilidade em arquivos específicos. Essa refatoração aumentou a organização do projeto, facilitou a reutilização dos componentes e reduziu problemas de importação e dependência.

### Correção da Infraestrutura Docker

Durante os testes de execução da aplicação foi identificado que o projeto não iniciava corretamente utilizando apenas Docker.

Para solucionar o problema, foi criado e configurado um arquivo `Dockerfile`, permitindo a construção adequada da imagem da aplicação e garantindo a execução correta do ambiente através do Docker Compose.

### Implementação e Validação de Testes de Login

Foram desenvolvidos testes automatizados para validar o formulário de autenticação da aplicação.

Os testes verificam cenários como:

* Campo de e-mail não preenchido;
* Campo de senha não preenchido;
* Exibição de mensagens de erro para entradas inválidas;
* Comportamento esperado do formulário durante o processo de login.

Essas validações contribuíram para aumentar a confiabilidade da aplicação e melhorar a experiência do usuário.

---

## Equipe

* Amanda Soares
* Felipe Gripp
* Julia de Souza
* Mariana Kanashiro

---

## Considerações Finais

O desenvolvimento do YourWay permitiu aplicar conceitos de frontend moderno, integração com APIs REST, autenticação de usuários, persistência de dados em nuvem, containerização com Docker e práticas de DevOps, proporcionando experiência prática em um cenário próximo ao desenvolvimento de aplicações reais.
