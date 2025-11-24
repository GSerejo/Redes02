const request = require('supertest');
const express = require('express');

// Vamos criar um app "falso" só para testar a lógica básica
// sem depender do Redis ou Postgres reais para o teste unitário
const app = express();
app.use(express.json());

app.post('/api/login-teste', (req, res) => {
    const { username, password } = req.body;
    // Lógica simples simulada para teste
    if (username === 'user1' && password === 'pass1') {
        res.status(200).json({ message: 'Login com sucesso' });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
});

describe('Testes de Autenticação', () => {
    test('Deve fazer login com credenciais corretas', async () => {
        const res = await request(app)
            .post('/api/login-teste')
            .send({ username: 'user1', password: 'pass1' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toContain('Login com sucesso');
    });

    test('Deve rejeitar login com senha errada', async () => {
        const res = await request(app)
            .post('/api/login-teste')
            .send({ username: 'user1', password: 'errada' });
        expect(res.statusCode).toEqual(401);
    });
});