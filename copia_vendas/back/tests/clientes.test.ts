import request from 'supertest'
import app from '../src/app'

describe('Clientes - funcionalidades (US08-US12)', () => {
  let token: string
  let clienteId: number

  beforeAll(async () => {
    const email = `test_clientes_${Date.now()}@example.com`
    const senha = 'Pass1234'
    await request(app).post('/cadastro').send({ nome: 'Tester', email, senha })
    const login = await request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(`username=${encodeURIComponent(email)}&password=${senha}`)
    token = login.body.access_token
  })

  test('US08 - cadastrar cliente (sucesso)', async () => {
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Cliente A', cpfCnpj: '12345678901', responsavel: 'Resp A' })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    clienteId = res.body.id
  })

  test('US08 - cadastro com campos obrigatórios vazios (erro)', async () => {
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: '' })
    expect(res.status).toBeGreaterThanOrEqual(400)
  })

  test('US09 - listar clientes', async () => {
    const res = await request(app).get('/clientes').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('US10 - editar cliente (sucesso)', async () => {
    const res = await request(app)
      .put(`/clientes/${clienteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Cliente A Editado', telefone: '99999999' })
    expect(res.status).toBe(200)
    expect(res.body.nome).toBe('Cliente A Editado')
  })

  test('US10 - editar cliente inexistente (erro)', async () => {
    const res = await request(app)
      .put('/clientes/99999999')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'X' })
    expect(res.status).toBeGreaterThanOrEqual(400)
  })

  test('US11 - inativar cliente (sucesso)', async () => {
    const res = await request(app)
      .patch(`/clientes/${clienteId}/inativar`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.ativo).toBe(false)
  })

  test('US11 - inativar cliente inexistente (erro)', async () => {
    const res = await request(app)
      .patch('/clientes/99999999/inativar')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBeGreaterThanOrEqual(400)
  })

  test('US12 - reativar cliente (sucesso)', async () => {
    const res = await request(app)
      .patch(`/clientes/${clienteId}/reativar`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.ativo).toBe(true)
  })

})
