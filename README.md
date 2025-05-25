# Projeto Front-End CASSI (COM BACK-END) - Confirmação de Solicitação de NIP

O projeto foi um desafio de front-end. Porém, tomei a liberdade de simular uma **SIMPLES** experiência real de sistema interativo, e realizei uma integração completa com um back-end ASP.NET Core 8.0.

## O que essa integração faz?

- Permite que as respostas do usuário à NIP (ex: "Sim, foi aberto por mim", "Não reconheço", etc.) sejam enviadas ao servidor

- O back-end recebe os dados via API REST e processa eles exibindo no console do navegador

- A comunicação é feita via requisições HTTP POST (fetch)


## Tecnologias Utilizadas na Integração

### Front-end:
- [React]()
- [React-Bootstrap]()
- [Bootstrap 5]()

### Back-end:
- [ASP.NET Core 8.0]()

---

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone 
```

### 2. Abra um terminal e entre na pasta do back-end

```bash
cd CassiAPI/ 
```

### 3. Rode o back-end (lembre-se de ter instalado o .NET 8.0)

- [.NET 8.0](https://dotnet.microsoft.com/pt-br/download)

```bash
dotnet run
```
Aparecerá escutando em: http://localhost:5000

### 4. Abra um novo terminal e entre na pasta onde está o front-end

```bash
cd Frontend/DesafioFront-EndStefaniniCassi-main/desafio-frontend-stefanini/
```

### 4. Instale as dependências

```bash
npm install
```
### 5. Rode o front-end

```bash
npm run dev
```
Aparecerá rodando localmente em: http://localhost:5173/
