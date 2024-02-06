<div align="center">
  <h3 align="center">Autenticação</h3>
  <div>
  <a href="https://bgcp.com.br/article/249990de-6e9e-491e-acfd-e92faf2bef1e">
  <img src="https://img.shields.io/badge/Download PDF (ENGLISH)-black?style=for-the-badge&logoColor=white&color=000000" alt="three.js" />
  </a>
  </div>
</div>

## 🚀 Introdução à Autenticação com Bearer Token JWT

A autenticação com Bearer Token JWT (JSON Web Token) é uma estratégia poderosa para proteger APIs, permitindo a transmissão segura de informações entre o cliente e o servidor. Este método é amplamente utilizado devido à sua simplicidade e eficácia, especialmente em combinação com a biblioteca Passport.js no Node.js, que simplifica o processo de autenticação em aplicações web.

### 🌟 Principais Características:

- **🔒 Segurança Reforçada**: Utiliza criptografia para garantir a integridade e a segurança dos dados.
- **🔄 Stateless**: Não requer armazenamento de sessão, facilitando a escalabilidade.
- **🌐 Compatibilidade Multi-Plataforma**: Pode ser usado em diversas aplicações, incluindo web, mobile e desktop.
- **🔧 Fácil Integração**: Com Passport.js, a implementação se torna simples e direta.

## 🛠️ Instalação

### Pré-requisitos:

Certifique-se de ter o Node.js instalado em seu sistema. Este tutorial assume que você já tem o Node.js e o NPM (Node Package Manager) configurados.

### Passos de Instalação:

1. **Criação do Projeto**:
    - Inicie um novo projeto Node.js com `npm init -y`.

2. **Instalação de Dependências**:
    - Execute `npm install express passport passport-jwt jsonwebtoken dotenv` para instalar as bibliotecas necessárias.

3. **Configuração do Ambiente**:
    - Crie um arquivo `.env` na raiz do seu projeto para armazenar variáveis de ambiente, como a chave secreta do JWT.

## 📊 Uso Básico

### Configuração Inicial:

1. **Configurar o Express**:
    - Crie um arquivo `server.js` e configure o servidor Express básico.

2. **Configurar Passport com Estratégia JWT**:
    - No mesmo arquivo ou em um módulo separado, configure o Passport usando a estratégia JWT para autenticar requests.

### Exemplo de Implementação com Node.js e Passport:

1. **server.js**: Configuração do Servidor Express e Passport.

```javascript
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// JWT Strategy
const opts = {
  strategyOptions: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  verifyCallback: (jwt_payload, done) => {
    // Aqui você pode adicionar uma lógica para verificar a validade do payload do JWT
    // Por exemplo, procurar o usuário no banco de dados
    const user = jwt_payload; // Simulação de usuário extraído do payload
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }
};

passport.use(new Strategy(opts.strategyOptions, opts.verifyCallback));
app.use(passport.initialize());

// Rota protegida
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: '🔐 Você acessou uma rota protegida!', user: req.user });
});

// Rota para gerar token JWT
app.get('/generate-token', (req, res) => {
  const payload = { id: 1, username: 'userTest' }; // Payload do usuário
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(PORT, () => console.log(`🌍 Servidor rodando na porta ${PORT}`));
```

2. **.env**: Exemplo de arquivo de variáveis de ambiente.

```
JWT_SECRET=seu_segredo_super_secreto
```

## 📈 Caso de Uso: Autenticando Usuários em uma API

### Teoria da Autenticação JWT:

💡 JWT permite a autenticação segura entre partes, transmitindo informações como um objeto JSON. Isso facilita a autorização e a troca de informações de forma segura.

### Motivo para Utilizar JWT:

🚀 Autenticação JWT é ideal para situações onde é necessário garantir a integridade e a segurança das informações trocadas entre cliente e servidor, sem a necessidade de armazenar o estado da sessão.

### Implementação Prática:

👨‍💻 Vamos implementar uma API simples que utiliza JWT para autenticação. A API terá uma rota para gerar tokens JWT e uma rota protegida que requer autenticação para ser acessada.

1. **Gerar Token JWT**:
    - Usuário acessa a rota `/generate-token` para obter um token JWT.

2. **Acessar Rota Protegida**:
    - Com o token obtido, o usuário faz uma requisição à rota `/protected`, passando o token no header `Authorization` como um Bearer Token.

### 🔍 Testes:

1. **Obter Token JWT**:
    - Acesse a rota `/generate-token` para receber um token JWT.

2. **Acessar Conteúdo Protegido**:
    - Utilize o token JWT para acessar a rota `/protected`, incluindo o token no header `Authorization: Bearer <token>`.
    - Verifique se a resposta inclui a mensagem protegida e os detalhes do usuário contidos no token.

## 🏆 Conclusão

Autenticação com Bearer Token JWT, em conjunto com Passport.js, oferece uma solução robusta e flexível para a segurança de APIs em Node.js. Este método facilita a implementação de autenticação stateless, otimizando a performance e escalabilidade de aplicações web. Espero que este tutorial tenha esclarecido o processo e incentivado a experimentar e integrar a autenticação JWT em seus projetos. Mantenha a curiosidade e continue explorando as possibilidades! 🚀💻