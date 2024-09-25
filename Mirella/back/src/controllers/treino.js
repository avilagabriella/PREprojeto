const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient

// Create
const createTreino = async (req, res) => {
    const { costas, braco, peito, perna } = req.body;
    const treino = await prisma.treino.create({
      data: { costas, braco, peito, perna },
    });
    res.json(treino);
  };
  
  // Read
  const readTreino = async (req, res) => {
    const treinos = await prisma.treino.findMany();
    res.json(treinos);
  };
  
  // Update
  const updateTreino = async (req, res) => {
    const { id } = req.params;
    const { costas, braco, peito, perna } = req.body;
    const treino = await prisma.treino.update({
      where: { id: Number(id) },
      data: { costas, braco, peito, perna },
    });
    res.json(treino);
  };
  
  // Delete
  const deleteTreino = async (req, res) => {
    const { id } = req.params;
    await prisma.treino.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Treino deletado com sucesso.' });
  };
  
module.exports = {
    createTreino,
    readTreino,
    updateTreino,
    deleteTreino
}