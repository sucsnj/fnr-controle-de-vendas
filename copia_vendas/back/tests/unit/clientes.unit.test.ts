import { Response } from 'express'
import {
  createCliente,
  getClientes,
  updateCliente,
  inativarCliente,
  reativarCliente,
} from '../../src/controllers/clientes.controller'

jest.mock('../../src/config/prisma', () => ({
  __esModule: true,
  default: {
    cliente: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}))

import prisma from '../../src/config/prisma'

describe('Clientes - Testes Unitários (US08-US12)', () => {
  let mockRes: Partial<Response>
  let mockReq: { body: any; params: any; query: any }

  beforeEach(() => {
    jest.clearAllMocks()
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }
    mockReq = { body: {}, params: {}, query: {} }
  })

  describe('US08 - Cadastrar Cliente', () => {
    test('Deve cadastrar cliente com sucesso', async () => {
      const clienteData = {
        nome: 'João Silva',
        cpfCnpj: '12345678900',
        responsavel: 'João',
        telefone: '11999999999',
        email: 'joao@example.com',
      }
      mockReq.body = clienteData as any

        ; (prisma.cliente.findUnique as jest.Mock).mockResolvedValue(null)
        ; (prisma.cliente.create as jest.Mock).mockResolvedValue({ id: 1, ...clienteData })

      await createCliente(mockReq as any, mockRes as Response)

      expect(mockRes.status).toHaveBeenCalledWith(201)
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ nome: 'João Silva', cpfCnpj: '12345678900' })
      )
    })

    test('Deve falhar ao cadastrar cliente com CPF/CNPJ vazio', async () => {
      mockReq.body = { nome: 'João', responsavel: 'João', cpfCnpj: undefined }
        ; (prisma.cliente.findUnique as jest.Mock).mockRejectedValueOnce(
          new Error(
            'Argument `where` of type ClienteWhereUniqueInput needs at least one of `id`, `cpfCnpj` or `email` arguments'
          )
        )

      await expect(createCliente(mockReq as any, mockRes as Response)).rejects.toThrow()
    })

    test('Deve falhar ao cadastrar cliente com CPF/CNPJ duplicado', async () => {
      mockReq.body = { nome: 'João', cpfCnpj: '12345678900', responsavel: 'João' }
        ; (prisma.cliente.findUnique as jest.Mock).mockResolvedValueOnce({ id: 1, cpfCnpj: '12345678900' })

      await createCliente(mockReq as any, mockRes as Response)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ detail: expect.stringContaining('CPF/CNPJ já cadastrado') })
      )
    })

    test('Deve falhar ao cadastrar cliente com nome vazio', async () => {
      mockReq.body = {
        nome: '',
        cpfCnpj: '12345678900',
        responsavel: 'João',
        telefone: '11999999999',
        email: 'joao@example.com',
      };

      (prisma.cliente.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.cliente.create as jest.Mock).mockResolvedValue(null);

      await createCliente(mockReq as any, mockRes as Response);

      expect(prisma.cliente.create).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ detail: expect.stringContaining('Nome') })
      );
    });
  })

  describe('US09 - Listar Clientes', () => {
    test('Deve listar clientes com sucesso', async () => {
      const clientes = [
        { id: 1, nome: 'João', cpfCnpj: '12345678900', ativo: true },
        { id: 2, nome: 'Maria', cpfCnpj: '98765432100', ativo: true },
      ]
        ; (prisma.cliente.findMany as jest.Mock).mockResolvedValue(clientes)

      await getClientes(mockReq as any, mockRes as Response)

      expect(mockRes.json).toHaveBeenCalledWith(clientes)
    })

    test('Deve listar apenas clientes inativos quando filtro inativo', async () => {
      mockReq.query = { inativo: 'true' }
      const clientes = [{ id: 1, nome: 'João', cpfCnpj: '12345678900', ativo: false }]
        ; (prisma.cliente.findMany as jest.Mock).mockResolvedValue(clientes)

      await getClientes(mockReq as any, mockRes as Response)

      expect(prisma.cliente.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ ativo: false }),
        })
      )
    })
  })

  describe('US10 - Editar Cliente', () => {
    test('Deve editar cliente com sucesso', async () => {
      mockReq.params = { id: '1' }
      mockReq.body = { nome: 'João Silva Atualizado' }
        ; (prisma.cliente.findUnique as jest.Mock).mockResolvedValue({ id: 1, nome: 'João' })
        ; (prisma.cliente.update as jest.Mock).mockResolvedValue({ id: 1, nome: 'João Silva Atualizado' })

      await updateCliente(mockReq as any, mockRes as Response)

      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'João Silva Atualizado' }))
    })

    test('Deve falhar ao editar cliente inexistente', async () => {
      mockReq.params = { id: '99999' }
      mockReq.body = { nome: 'João' }
        ; (prisma.cliente.findUnique as jest.Mock).mockResolvedValue(null)

      await updateCliente(mockReq as any, mockRes as Response)

      expect(mockRes.status).toHaveBeenCalledWith(404)
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ detail: 'Cliente não encontrado' }))
    })
  })

  describe('US11 - Inativar Cliente', () => {
    test('Deve inativar cliente com sucesso', async () => {
      mockReq.params = { id: '1' }
        ; (prisma.cliente.update as jest.Mock).mockResolvedValue({
          id: 1,
          nome: 'João',
          ativo: false,
        })

      await inativarCliente(mockReq as any, mockRes as Response)

      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ ativo: false }))
    })

    test('Deve falhar ao inativar cliente inexistente (expected fail)', async () => {
      mockReq.params = { id: '99999' }
        ; (prisma.cliente.update as jest.Mock).mockRejectedValueOnce(new Error('Record to update not found'))

      await expect(inativarCliente(mockReq as any, mockRes as Response)).rejects.toThrow('Record to update not found')
    })
  })

  describe('US12 - Reativar Cliente', () => {
    test('Deve reativar cliente com sucesso', async () => {
      mockReq.params = { id: '1' }
        ; (prisma.cliente.update as jest.Mock).mockResolvedValue({
          id: 1,
          nome: 'João',
          ativo: true,
        })

      await reativarCliente(mockReq as any, mockRes as Response)

      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ ativo: true }))
    })

    test('Deve falhar ao reativar cliente inexistente (expected fail)', async () => {
      mockReq.params = { id: '99999' }
        ; (prisma.cliente.update as jest.Mock).mockRejectedValueOnce(new Error('Record to update not found'))

      await expect(reativarCliente(mockReq as any, mockRes as Response)).rejects.toThrow('Record to update not found')
    })
  })
})
