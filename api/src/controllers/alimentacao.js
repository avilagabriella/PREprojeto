const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Create
const createAlimentacao = async (req, res) => {
    const { proteinas, carboidratos, frutas, lacticinios } = req.body;
    const alimentacao = await prisma.alimentacao.create({
      data: { proteinas, carboidratos, frutas, lacticinios },
    });
    res.json(alimentacao);
  };
  
  // Read
  const readAlimentacao = async (req, res) => {
    const alimentacoes = await prisma.alimentacao.findMany();
    res.json(alimentacoes);
  };
  
  // Update
  const updateAlimentacao = async (req, res) => {
    const { id } = req.params;
    const { proteinas, carboidratos, frutas, lacticinios } = req.body;
    const alimentacao = await prisma.alimentacao.update({
      where: { id: Number(id) },
      data: { proteinas, carboidratos, frutas, lacticinios },
    });
    res.json(alimentacao);
  };
  
  // Delete
  const deleteAlimentacao = async (req, res) => {
    const { id } = req.params;
    await prisma.alimentacao.delete({
        where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Alimentação deletada com sucesso.' });
};

  

  

module.exports = {
    createAlimentacao,
    readAlimentacao,
    updateAlimentacao,
    deleteAlimentacao
}