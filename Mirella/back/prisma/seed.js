import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Cria registros de exemplo para Alimentacao
  const alimentacao = await prisma.alimentacao.createMany({
    data: [
      {
        proteinas: 'Frango, Peixe',
        carboidratos: 'Arroz, Batata',
        frutas: 'Maçã, Banana',
        lacticinios: 'Leite, Queijo'
      },
      {
        proteinas: 'Carne Bovina, Ovos',
        carboidratos: 'Pão, Massa',
        frutas: 'Laranja, Morango',
        lacticinios: 'Iogurte, Manteiga'
      }
    ],
  });

  console.log('Alimentacao seeds created:', alimentacao);

  // Cria registros de exemplo para Treino
  const treino = await prisma.treino.createMany({
    data: [
      {
        costas: 'Remada, Puxada',
        braco: 'Rosca, Tríceps',
        peito: 'Supino, Flexão',
        perna: 'Agachamento, Leg Press'
      },
      {
        costas: 'Pullover, Barra Fixa',
        braco: 'Martelo, Tríceps Testa',
        peito: 'Inclinado, Peck Deck',
        perna: 'Afundo, Extensão'
      }
    ],
  });

  console.log('Treino seeds created:', treino);

  // Cria registros de exemplo para Usuarios
  const usuarios = await prisma.usuarios.createMany({
    data: [
      {
        nome: 'João Silva',
        email: 'joao.silva@example.com',
        senha: '123456',
        telefone: '1234567890',
        alimentacao: 'Frango, Arroz, Maçã',
        treino: 'Remada, Supino, Agachamento'
      },
      {
        nome: 'Maria Oliveira',
        email: 'maria.oliveira@example.com',
        senha: 'password',
        telefone: '0987654321',
        alimentacao: 'Carne Bovina, Pão, Laranja',
        treino: 'Pullover, Inclinado, Afundo'
      }
    ],
  });

  console.log('Usuarios seeds created:', usuarios);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
