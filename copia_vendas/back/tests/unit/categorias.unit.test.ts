import { Response } from 'express'
import {
  createCategoria,
  getCategorias,
  updateCategoria,
  inativarCategoria,
  reativarCategoria,
} from '../../src/controllers/categorias.controller'

jest.mock('../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    categoria: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}))

import prisma from '../../src/config/prisma'

describe('Categorias - Testes Unitários US20', () => {
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

  describe('Criar Categoria', () => {
    test('Deve criar categoria com sucesso', async () => {
      const categoriaData = { nome: 'Eletrônicos', descricao: 'Produtos eletrônicos' }
      mockReq.body = categoriaData
      ;(prisma.categoria.findUnique as jest.Mock).mockResolvedValueOnce(null)
      ;(prisma.categoria.create as jest.Mock).mockResolvedValueOnce({
        id: 1,
        ...categoriaData,
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      await createCategoria(mockReq as any, mockRes as Response)

      expect(mockRes.status).toHaveBeenCalledWith(201)
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'Eletrônicos' }))
    })

    test('Deve falhar ao criar categoria com nome duplicado', async () => {
      const categoriaData = { nome: 'Eletrônicos', descricao: 'Produtos eletrônicos' }
      mockReq.body = categoriaData
      ;(prisma.categoria.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 1,
        nome: 'Eletrônicos',
      })

      await createCategoria(mockReq as any, mockRes as Response)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ detail: 'Categoria já cadastrada' })
      )
    })

    test('Deve criar categoria sem descricao', async () => {
      const categoriaData = { nome: 'Mobília' }
      mockReq.body = categoriaData
      ;(prisma.categoria.findUnique as jest.Mock).mockResolvedValueOnce(null)
      ;(prisma.categoria.create as jest.Mock).mockResolvedValueOnce({
        id: 2,
        nome: 'Mobília',
        descricao: null,
        ativo: true,
      })

      await createCategoria(mockReq as any, mockRes as Response)

      expect(mockRes.status).toHaveBeenCalledWith(201)
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'Mobília' }))
    })
  })

  describe('Listar Categorias', () => {
    test('Deve listar categorias com sucesso', async () => {
      const categorias = [
        { id: 1, nome: 'Eletrônicos', ativo: true },
        { id: 2, nome: 'Mobília', ativo: true },
      ]
      ;(prisma.categoria.findMany as jest.Mock).mockResolvedValueOnce(categorias)

      await getCategorias(mockReq as any, mockRes as Response)

      expect(mockRes.json).toHaveBeenCalledWith(categorias)
    })

    test('Deve listar apenas categorias inativas quando filtro inativo', async () => {
      mockReq.query = { inativo: 'true' }
      const categorias = [{ id: 1, nome: 'Eletrônicos', ativo: false }]
      ;(prisma.categoria.findMany as jest.Mock).mockResolvedValueOnce(categorias)

      await getCategorias(mockReq as any, mockRes as Response)

      expect(prisma.categoria.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ ativo: false }),
        })
      )
    })
  })

  describe('Editar Categoria', () => {
    test('Deve editar categoria com sucesso', async () => {
      mockReq.params = { id: '1' }
      mockReq.body = { nome: 'Eletrônicos Atualizados', ativo: true }
      ;(prisma.categoria.update as jest.Mock).mockResolvedValueOnce({
        id: 1,
        nome: 'Eletrônicos Atualizados',
        ativo: true,
      })

      await updateCategoria(mockReq as any, mockRes as Response)

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ nome: 'Eletrônicos Atualizados' })
      )
    })

    test('Deve falhar ao editar categoria inexistente (expected fail)', async () => {
      mockReq.params = { id: '99999' }
      mockReq.body = { nome: 'Não Existe' }
      ;(prisma.categoria.update as jest.Mock).mockRejectedValueOnce(new Error('Record to update not found'))

      await expect(updateCategoria(mockReq as any, mockRes as Response)).rejects.toThrow('Record to update not found')
    })
  })

  describe('Inativar Categoria', () => {
    test('Deve inativar categoria com sucesso', async () => {
      mockReq.params = { id: '1' }
      ;(prisma.categoria.update as jest.Mock).mockResolvedValueOnce({
        id: 1,
        nome: 'Eletrônicos',
        ativo: false,
      })

      await inativarCategoria(mockReq as any, mockRes as Response)

      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ ativo: false }))
    })

    test('Deve falhar ao inativar categoria inexistente (expected fail)', async () => {
      mockReq.params = { id: '99999' }
      ;(prisma.categoria.update as jest.Mock).mockRejectedValueOnce(new Error('Record to update not found'))

      await expect(inativarCategoria(mockReq as any, mockRes as Response)).rejects.toThrow('Record to update not found')
    })
  })

  describe('Reativar Categoria', () => {
    test('Deve reativar categoria com sucesso', async () => {
      mockReq.params = { id: '1' }
      ;(prisma.categoria.update as jest.Mock).mockResolvedValueOnce({
        id: 1,
        nome: 'Eletrônicos',
        ativo: true,
      })

      await reativarCategoria(mockReq as any, mockRes as Response)

      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ ativo: true }))
    })

    test('Deve falhar ao reativar categoria inexistente (expected fail)', async () => {
      mockReq.params = { id: '99999' }
      ;(prisma.categoria.update as jest.Mock).mockRejectedValueOnce(new Error('Record to update not found'))

      await expect(reativarCategoria(mockReq as any, mockRes as Response)).rejects.toThrow('Record to update not found')
    })
  })
})
