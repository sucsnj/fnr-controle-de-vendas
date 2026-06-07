import request from 'supertest'
import app from '../../src/app'

describe('Categorias - funcionalidades (US20)', () => {
  let token: string

  beforeAll(async () => {
    const email = `test_categorias_${Date.now()}@example.com`
    const senha = 'Pass1234'

    // criar usuário de teste
    const cadastroRes = await request(app).post('/cadastro').send({ nome: 'Tester', email, senha })
    if (!cadastroRes.ok && cadastroRes.status >= 400) {
      throw new Error(`Falha no cadastro de teste: ${cadastroRes.status}`)
    }

    // login (form urlencoded)
    const login = await request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(`username=${encodeURIComponent(email)}&password=${encodeURIComponent(senha)}`)

    if (!login.body || !login.body.access_token) {
      throw new Error('Falha no login durante os testes funcionais')
    }
    token = login.body.access_token
  }, 20000)

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

    // criar a primeira categoria com autenticação
    const first = await request(app)
      .post('/categorias')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: name })

    expect(first.status).toBe(201)
    expect(first.body).toHaveProperty('id')

    // tentar criar novamente com o mesmo nome (deve falhar)
    const res = await request(app)
      .post('/categorias')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: name })

    expect(res.status).toBeGreaterThanOrEqual(400)
  })
})
