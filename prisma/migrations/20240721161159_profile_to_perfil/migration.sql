/*
  Warnings:

  - You are about to drop the column `fotoProfile` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "fotoProfile",
ADD COLUMN     "fotoPerfil" TEXT;
