-- CreateTable
CREATE TABLE `Usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(20) NOT NULL,
    `senha` VARCHAR(10) NOT NULL,
    `telefone` VARCHAR(20) NOT NULL,
    `alimentacao` VARCHAR(255) NOT NULL,
    `treino` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alimentacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `proteinas` VARCHAR(255) NOT NULL,
    `carboidratos` VARCHAR(255) NOT NULL,
    `frutas` VARCHAR(255) NOT NULL,
    `lacticinios` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Treino` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `costas` VARCHAR(255) NOT NULL,
    `braco` VARCHAR(20) NOT NULL,
    `peito` VARCHAR(10) NOT NULL,
    `perna` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
