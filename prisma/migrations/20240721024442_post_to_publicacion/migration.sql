/*
  Warnings:

  - You are about to drop the column `idPost` on the `Reacciones` table. All the data in the column will be lost.
  - Added the required column `idPublicacion` to the `Reacciones` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reacciones" DROP CONSTRAINT "Reacciones_idPost_fkey";

-- AlterTable
ALTER TABLE "Reacciones" DROP COLUMN "idPost",
ADD COLUMN     "idPublicacion" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reacciones" ADD CONSTRAINT "Reacciones_idPublicacion_fkey" FOREIGN KEY ("idPublicacion") REFERENCES "Publicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
