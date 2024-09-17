const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient
const jwt = require('jsonwebtoken');
require('dotenv').config();

const create = async (req, res) => {
    try {
        const { nome, email, senha, telefone, alimentacao, treino } = req.body;

        // Verifica se os campos obrigatórios estão presentes
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios!' });
        }

        // Cria um novo usuário
        const usuario = await prisma.usuarios.create({
            data: {
                nome,
                email,
                senha,
                telefone: telefone || null, // Permite telefone ser opcional
                alimentacao: alimentacao || null, // Permite alimentacao ser opcional
                treino: treino || null, // Permite treino ser opcional
            },
        });

        res.status(201).json(usuario); // Status 201 é mais apropriado para criação de recursos

    } catch (error) {
        console.error(error); // Utiliza console.error para erros
        res.status(500).json({ error: 'Erro interno do servidor!' }); // Responde com status 500 em caso de erro
    }
};


const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Valida se email e senha foram fornecidos
        if (!email || !senha) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }

        // Procura o usuário com o email fornecido
        const usuario = await prisma.usuarios.findUnique({
            where: { email },
        });

        // Verifica se o usuário existe e se a senha está correta
        if (usuario && await bcrypt.compare(senha, usuario.senha)) {
            // Gera um token JWT
            const token = jwt.sign({ email: usuario.email }, process.env.KEY, {
                expiresIn: '1h' // Define a expiração como 1 hora
            });

            // Retorna o token e outras informações do usuário, mas não a senha
            return res.json({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                telefone: usuario.telefone,
                alimentacao: usuario.alimentacao,
                treino: usuario.treino,
                token
            });
        } else {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }
    } catch (error) {
        console.error(error); // Loga o erro para depuração
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

// const login = async (req, res) => {
//     try {
//         const user = await prisma.usuarios.findFirst({
//             where: {
//                 email: req.body.email
//             }
//         });

//         if (!user) {
//             return res.status(404).json({ error: "Usuário nâo encontrado"}).end()
//         }

//         // Talvez essa verificação não funcione, teste-a e caso de certo, apague este comentário.

//         if(!user.password === req.body.password) {
//             return res.status(404).json({ error: "Senha incorreta!" }).end()
//         }

//         // Tudo deu certo no login, hora de retornar as informaçôes ao front

//         res.status(200).json({
//             uid: user.id,
//             email: user.email,
//             user
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

const update = async (req, res) => {
    const users = await prisma.usuarios.update({
      where: {
        id: Number(req.params.user_id)
      },
      data: req.body
    })
  
    res.status(200).json({msg: "Tudo correto!" })
}

const read = async (req, res) => {
    let user = await prisma.usuarios.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        senha: true,
        telefone: true,
        alimentacao: true,
        treino: true
      }
    })
  
    res.status(200).json(user).end()
}

module.exports = {
    create,
    login,
    update,
    read
}