-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('Masculino', 'Femenino', 'Binario');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "sexo" "Sexo" NOT NULL DEFAULT 'Masculino';
