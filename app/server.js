const express = require('express');
const session = require('express-session');
const { createClient } = require('redis');
const RedisStore = require('connect-redis');
const os = require('os');
const { Pool } = require('pg');

// --- Conexões ---
// 1. Cliente Redis (para Sessões)
const redisClient = createClient({
  // "session-store" é o nome do container Redis no docker-compose
  url: 'redis://session-store:6379' 
});
redisClient.connect().catch(console.error);

// 2. Pool PostgreSQL (para Usuários)
const dbPool = new Pool({
  user: 'user',
  host: 'db-server', // "db-server" é o nome do container DB
  database: 'appdb',
  password: 'password',
  port: 5432,
});

// 3. Store de Sessão
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'sess:',
});

// --- Config Express ---
const app = express();
app.use(express.static('public')); // Para servir o index.html
app.use(express.json());
app.use(
  session({
    store: redisStore,
    secret: 'super-secreto-do-trabalho',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 }, // 1h
  })
);

// --- Endpoints ---
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Simulação de validação no DB. Em um projeto real, use bcrypt.compare
  const result = await dbPool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]); // Use hash!

  if (result.rows.length > 0) {
    const user = result.rows[0];

    // REQUISITO CUMPRIDO: Salva dados na sessão
    req.session.userId = user.id;
    req.session.username = user.name;
    req.session.loginTime = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

    res.json({ message: `Login com sucesso, ${user.name}!` });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// Middleware de proteção
function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.status(401).json({ message: 'Não autorizado' });
}

app.get('/api/meu-perfil', isAuthenticated, (req, res) => {
  // REQUISITO CUMPRIDO: Retorna dados da sessão e nome do server
  res.json({
    username: req.session.username,
    loginTime: req.session.loginTime,
    sessionId: req.session.id, // O "código" da sessão
    serverHostname: os.hostname(), // o hostname do container
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor [${os.hostname()}] rodando na porta ${port}`);
});