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