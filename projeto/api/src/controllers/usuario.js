// usuario.controller.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

class UsuarioController {
  async criarUsuario(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const senhaHash = await bcrypt.hash(senha, 10);
      const usuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: senhaHash,
        },
      });
      res.status(201).json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }

  async realizarLogin(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await prisma.usuario.findUnique({
        where: {
          email,
        },
      });
      if (!usuario) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ message: 'Senha inválida' });
      }
      const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao realizar login' });
    }
  }

  async alterarUsuario(req, res) {
    try {
      const id = req.params.id;
      const { nome, email, senha } = req.body;
      const usuario = await prisma.usuario.findUnique({
        where: {
          id,
        },
      });
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      const senhaHash = await bcrypt.hash(senha, 10);
      const usuarioAtualizado = await prisma.usuario.update({
        where: {
          id,
        },
        data: {
          nome,
          email,
          senha: senhaHash,
        },
      });
      res.status(200).json(usuarioAtualizado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao alterar usuário' });
    }
  }

  async deletarUsuario(req, res) {
    try {
      const id = req.params.id;
      const usuario = await prisma.usuario.findUnique({
        where: {
          id,
        },
      });
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      await prisma.usuario.delete({
        where: {
          id,
        },
      });
      res.status(204).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
  }
}

module.exports = UsuarioController;