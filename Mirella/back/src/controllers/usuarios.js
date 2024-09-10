const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient

const create = async (req, res) => {
    try {
        const emaiExistente = await prisma.users.findUnique({
            where: {
                email: req.body.email,
            },
        })

        if (emaiExistente) {
            return res.status(400).json({ error: 'Email já registrado!'})
        }

        const users = await prisma.usuarios.create({
            data: {
                email: req.body.email,
                senha: req.body.senha
            },
        })

        res.status(200).json(users).end();

    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        const user = await prisma.usuarios.findFirst({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            return res.status(404).json({ error: "Usuário nâo encontrado"}).end()
        }

        // Talvez essa verificação não funcione, teste-a e caso de certo, apague este comentário.

        if(!user.password === req.body.password) {
            return res.status(404).json({ error: "Senha incorreta!" }).end()
        }

        // Tudo deu certo no login, hora de retornar as informaçôes ao front

        res.status(200).json({
            uid: user.id,
            email: user.email,
            user
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    create,
    login
}