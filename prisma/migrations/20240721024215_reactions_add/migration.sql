/*
  Warnings:

  - You are about to drop the column `idComentario` on the `Reacciones` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reacciones" DROP CONSTRAINT "Reacciones_idComentario_fkey";

-- AlterTable
ALTER TABLE "Reacciones" DROP COLUMN "idComentario";

-- CreateTable
CREATE TABLE "ReaccionesComentario" (
    "id" SERIAL NOT NULL,
    "idPublicacion" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idComentario" INTEGER NOT NULL,
    "reaccion" TEXT NOT NULL,
    "fechaPublicacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "flag" "Estado" NOT NULL DEFAULT 'Nuevo',

    CONSTRAINT "ReaccionesComentario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReaccionesComentario" ADD CONSTRAINT "ReaccionesComentario_idPublicacion_fkey" FOREIGN KEY ("idPublicacion") REFERENCES "Publicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReaccionesComentario" ADD CONSTRAINT "ReaccionesComentario_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReaccionesComentario" ADD CONSTRAINT "ReaccionesComentario_idComentario_fkey" FOREIGN KEY ("idComentario") REFERENCES "Comentario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
