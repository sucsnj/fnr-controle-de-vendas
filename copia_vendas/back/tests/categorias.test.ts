import request from 'supertest'
import app from '../src/app'

describe('Categorias - funcionalidades (US20)', () => {
  let token: string

  beforeAll(async () => {
    const email = `test_categorias_${Date.now()}@example.com`
    const senha = 'Pass1234'
    await request(app).post('/cadastro').send({ nome: 'Tester', email, senha })
    const login = await request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(`username=${encodeURIComponent(email)}&password=${senha}`)
    token = login.body.access_token
  })

  test('US20 - criar categoria (sucesso)', async () => {
    const res = await request(app)
      .post('/categorias')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: `Cat ${Date.now()}`, descricao: 'Categoria de teste' })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
  })

  test('US20 - criar categoria com nome duplicado (erro)', async () => {
    const name = `DupCat${Date.now()}`
    await request(app).post('/categorias').send({ nome: name })
    const res = await request(app)
      .post('/categorias')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: name })
    expect(res.status).toBeGreaterThanOrEqual(400)
  })

})
