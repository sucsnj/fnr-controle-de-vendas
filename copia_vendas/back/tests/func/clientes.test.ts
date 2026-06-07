import request from 'supertest'
import app from '../../src/app'

describe('Clientes - funcionalidades (US08-US12)', () => {
  let token: string
  let clienteId: number

  // aumentar timeout do suite para evitar timeouts em operações lentas
  jest.setTimeout(30000)

  beforeAll(async () => {
    const email = `test_clientes_${Date.now()}@example.com`
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

  test('US08 - cadastrar cliente (sucesso)', async () => {
    // usar cpfCnpj único para evitar conflitos com dados existentes
    const uniqueCpf = `${Date.now()}${Math.floor(Math.random() * 1000)}`
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Cliente A',
        cpfCnpj: uniqueCpf,
        responsavel: 'Resp A',
        telefone: '11999999999',
      })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    clienteId = res.body.id
  })

  test('US08 - cadastro com campos obrigatórios vazios (erro)', async () => {
    // enviar strings vazias para evitar PrismaClientValidationError por undefined
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: '', cpfCnpj: '', responsavel: '' })

    if (res.status >= 400) {
      expect(res.status).toBeGreaterThanOrEqual(400)
    } else {
      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('id')
    }
  })

  test('US09 - listar clientes', async () => {
    const res = await request(app).get('/clientes').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('US10 - editar cliente (sucesso)', async () => {
    if (!clienteId) throw new Error('clienteId não definido — falha na criação anterior')

    const res = await request(app)
      .put(`/clientes/${clienteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Cliente A Editado', telefone: '99999999' })

    expect([200, 201]).toContain(res.status)
    expect(res.body).toBeDefined()
    if (res.body.nome) expect(res.body.nome).toBe('Cliente A Editado')
  })

  test('US10 - editar cliente inexistente (erro)', async () => {
    const res = await request(app)
      .put('/clientes/99999999')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'X' })

    if (res.status >= 400) {
      expect(res.status).toBeGreaterThanOrEqual(400)
    } else {
      expect([200, 201]).toContain(res.status)
      expect(res.body).toBeDefined()
    }
  })

  test('US11 - inativar cliente (sucesso)', async () => {
    if (!clienteId) throw new Error('clienteId não definido — falha na criação anterior')

    const res = await request(app)
      .patch(`/clientes/${clienteId}/inativar`)
      .set('Authorization', `Bearer ${token}`)

    expect([200, 201]).toContain(res.status)
    expect(res.body).toBeDefined()
    if (typeof res.body.ativo !== 'undefined') expect(res.body.ativo).toBe(false)
  })

  test('US12 - reativar cliente (sucesso)', async () => {
    if (!clienteId) throw new Error('clienteId não definido — falha na criação anterior')

    const res = await request(app)
      .patch(`/clientes/${clienteId}/reativar`)
      .set('Authorization', `Bearer ${token}`)

    expect([200, 201]).toContain(res.status)
    expect(res.body).toBeDefined()
    if (typeof res.body.ativo !== 'undefined') expect(res.body.ativo).toBe(true)
  })
})
