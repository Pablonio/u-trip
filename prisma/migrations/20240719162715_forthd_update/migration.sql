/*
  Warnings:

  - You are about to drop the column `contraseUtilizada` on the `RecuperacionContrasena` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RecuperacionContrasena" DROP COLUMN "contraseUtilizada",
ADD COLUMN     "contrasenafueutilizada" BOOLEAN NOT NULL DEFAULT false;
