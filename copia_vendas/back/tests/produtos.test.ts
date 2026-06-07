import request from 'supertest'
import app from '../src/app'

describe('Produtos - funcionalidades (US16-US19)', () => {
  let token: string
  let categoriaId: number
  let produtoId: number

  beforeAll(async () => {
    const email = `test_produtos_${Date.now()}@example.com`
    const senha = 'Pass1234'
    await request(app).post('/cadastro').send({ nome: 'Tester', email, senha })
    const login = await request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(`username=${encodeURIComponent(email)}&password=${senha}`)
    token = login.body.access_token

    // criar uma categoria para associar ao produto
    const catRes = await request(app)
      .post('/categorias')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: `CatProd${Date.now()}` })
    categoriaId = catRes.body.id
  })

  test('US16 - cadastrar produto (sucesso)', async () => {
    const res = await request(app)
      .post('/produtos')
      .set('Authorization', `Bearer ${token}`)
      .send({ tipo: 'Produto Teste', quantidade: 10, valorUnit: 12.5, valorTotal: 125, unidadeMedida: 'un', categoriaId })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    produtoId = res.body.id
  })

  test('US16 - cadastrar produto com valor negativo (erro)', async () => {
    const res = await request(app)
      .post('/produtos')
      .set('Authorization', `Bearer ${token}`)
      .send({ tipo: 'Produto Neg', quantidade: 1, valorUnit: -5, valorTotal: -5, unidadeMedida: 'un', categoriaId })
    expect(res.status).toBeGreaterThanOrEqual(400)
  })

  test('US17 - listar e garantir inclusão de categoria', async () => {
    const res = await request(app).get('/produtos').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    // pelo menos um produto deve conter a associação de categoria (se houver)
    const hasCategoria = res.body.some((p: any) => p.categoria)
    expect(hasCategoria).toBeTruthy()
  })

  test('US18 - editar produto (sucesso)', async () => {
    const res = await request(app)
      .put(`/produtos/${produtoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ tipo: 'Produto Editado', quantidade: 20 })
    expect(res.status).toBe(200)
    expect(res.body.tipo).toBe('Produto Editado')
  })

  test('US18 - editar produto inexistente (erro)', async () => {
    const res = await request(app)
      .put('/produtos/99999999')
      .set('Authorization', `Bearer ${token}`)
      .send({ tipo: 'X' })
    expect(res.status).toBeGreaterThanOrEqual(400)
  })

  test('US19 - inativar produto (sucesso)', async () => {
    const res = await request(app)
      .patch(`/produtos/${produtoId}/inativar`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.ativo).toBe(false)
  })

  test('US19 - inativar produto inexistente (erro)', async () => {
    const res = await request(app)
      .patch('/produtos/99999999/inativar')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBeGreaterThanOrEqual(400)
  })

})
