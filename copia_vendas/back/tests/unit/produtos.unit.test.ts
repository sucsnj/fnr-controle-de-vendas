import { Response } from 'express'
import {
  createProduto,
  getProdutos,
  updateProduto,
  inativarProduto,
  reativarProduto,
} from '../../src/controllers/produtos.controller'

jest.mock('../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    produto: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}))

import prisma from '../../src/config/prisma'

describe('Produtos - Testes Unitários (US16-US19)', () => {
  let mockRes: Partial<Response>
  let mockReq: any

  beforeEach(() => {
    jest.clearAllMocks()
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }
    mockReq = { body: {}, params: {}, query: {} }
  })

  describe('US16 - Cadastrar Produto', () => {
    test('Deve cadastrar produto com sucesso', async () => {
      const produtoData = {
        tipo: 'Notebook',
        quantidade: 10,
        valorUnit: 2000,
        valorTotal: 20000,
        unidadeMedida: 'un',
        categoriaId: 1,
      }
      mockReq.body = produtoData
      ;(prisma.produto.create as jest.Mock).mockResolvedValue({
        id: 1,
        ...produtoData,
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoria: { id: 1, nome: 'Eletrônicos' },
      })

      await createProduto(mockReq as any, mockRes as Response)

      expect(mockRes.status).toHaveBeenCalledWith(201)
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ tipo: 'Notebook', quantidade: 10 })
      )
    })

    test('Deve cadastrar produto com valor negativo sem validação (expected fail)', async () => {
      const produtoData = {
        tipo: 'Produto Inválido',
        quantidade: 1,
        valorUnit: -100,
        valorTotal: -100,
        unidadeMedida: 'un',
        categoriaId: 1,
      }
      mockReq.body = produtoData
      ;(prisma.produto.create as jest.Mock).mockResolvedValue({
        id: 1,
        ...produtoData,
        ativo: true,
      })

      await createProduto(mockReq as any, mockRes as Response)

      expect(mockRes.status).toHaveBeenCalledWith(201)
    })

    test('Deve cadastrar produto com quantidade negativa sem validação (expected fail)', async () => {
      const produtoData = {
        tipo: 'Produto Inválido',
        quantidade: -5,
        valorUnit: 100,
        valorTotal: 100,
        unidadeMedida: 'un',
        categoriaId: 1,
      }
      mockReq.body = produtoData
      ;(prisma.produto.create as jest.Mock).mockResolvedValue({
        id: 1,
        ...produtoData,
        ativo: true,
      })

      await createProduto(mockReq as any, mockRes as Response)

      expect(mockRes.status).toHaveBeenCalledWith(201)
    })
  })

  describe('US17 - Listar Produtos', () => {
    test('Deve listar produtos com sucesso', async () => {
      const produtos = [
        { id: 1, tipo: 'Notebook', quantidade: 10, ativo: true, categoria: { id: 1, nome: 'Eletrônicos' } },
        { id: 2, tipo: 'Mouse', quantidade: 50, ativo: true, categoria: { id: 1, nome: 'Eletrônicos' } },
      ]
      ;(prisma.produto.findMany as jest.Mock).mockResolvedValue(produtos)

      await getProdutos(mockReq as any, mockRes as Response)

      expect(mockRes.json).toHaveBeenCalledWith(produtos)
    })

    test('Deve listar apenas produtos inativos quando filtro inativo', async () => {
      mockReq.query = { inativo: 'true' }
      const produtos = [{ id: 1, tipo: 'Notebook', ativo: false }]
      ;(prisma.produto.findMany as jest.Mock).mockResolvedValue(produtos)

      await getProdutos(mockReq as any, mockRes as Response)

      expect(prisma.produto.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ ativo: false }),
        })
      )
    })
  })

  describe('US18 - Editar Produto', () => {
    test('Deve editar produto com sucesso', async () => {
      mockReq.params = { id: '1' }
      mockReq.body = { tipo: 'Notebook Atualizado', quantidade: 20 }
      ;(prisma.produto.findUnique as jest.Mock).mockResolvedValue({ id: 1, tipo: 'Notebook' })
      ;(prisma.produto.update as jest.Mock).mockResolvedValue({
        id: 1,
        tipo: 'Notebook Atualizado',
        quantidade: 20,
      })

      await updateProduto(mockReq as any, mockRes as Response)

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ tipo: 'Notebook Atualizado' })
      )
    })

    test('Deve falhar ao editar produto inexistente', async () => {
      mockReq.params = { id: '99999' }
      mockReq.body = { tipo: 'Notebook' }
      ;(prisma.produto.findUnique as jest.Mock).mockResolvedValue(null)

      await updateProduto(mockReq as any, mockRes as Response)

      expect(mockRes.status).toHaveBeenCalledWith(404)
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ detail: 'Produto não encontrado' })
      )
    })
  })

  describe('US19 - Inativar Produto', () => {
    test('Deve inativar produto com sucesso', async () => {
      mockReq.params = { id: '1' }
      ;(prisma.produto.update as jest.Mock).mockResolvedValue({
        id: 1,
        tipo: 'Notebook',
        ativo: false,
      })

      await inativarProduto(mockReq as any, mockRes as Response)

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ ativo: false })
      )
    })

    test('Deve falhar ao inativar produto inexistente (expected fail)', async () => {
      mockReq.params = { id: '99999' }
      ;(prisma.produto.update as jest.Mock).mockRejectedValueOnce(new Error('Record to update not found'))

      await expect(inativarProduto(mockReq as any, mockRes as Response)).rejects.toThrow('Record to update not found')
    })
  })

  describe('US20 - Reativar Produto', () => {
    test('Deve reativar produto com sucesso', async () => {
      mockReq.params = { id: '1' }
      ;(prisma.produto.update as jest.Mock).mockResolvedValue({
        id: 1,
        tipo: 'Notebook',
        ativo: true,
      })

      await reativarProduto(mockReq as any, mockRes as Response)

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ ativo: true })
      )
    })

    test('Deve falhar ao reativar produto inexistente (expected fail)', async () => {
      mockReq.params = { id: '99999' }
      ;(prisma.produto.update as jest.Mock).mockRejectedValueOnce(new Error('Record to update not found'))

      await expect(reativarProduto(mockReq as any, mockRes as Response)).rejects.toThrow('Record to update not found')
    })
  })
})
