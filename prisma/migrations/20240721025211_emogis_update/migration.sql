/*
  Warnings:

  - You are about to drop the `emogis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "emogis" DROP CONSTRAINT "emogis_idComentario_fkey";

-- DropForeignKey
ALTER TABLE "emogis" DROP CONSTRAINT "emogis_idPublicacion_fkey";

-- DropTable
DROP TABLE "emogis";

-- CreateTable
CREATE TABLE "Emogis" (
    "id" SERIAL NOT NULL,
    "idPublicacion" INTEGER NOT NULL,
    "emogi" TEXT NOT NULL,
    "flag" "Estado" NOT NULL DEFAULT 'Nuevo',

    CONSTRAINT "Emogis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmogisComentario" (
    "id" SERIAL NOT NULL,
    "idEmogi" INTEGER NOT NULL,
    "emogiComentario" TEXT NOT NULL,
    "flag" "Estado" NOT NULL DEFAULT 'Nuevo',

    CONSTRAINT "EmogisComentario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Emogis" ADD CONSTRAINT "Emogis_idPublicacion_fkey" FOREIGN KEY ("idPublicacion") REFERENCES "Publicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmogisComentario" ADD CONSTRAINT "EmogisComentario_idEmogi_fkey" FOREIGN KEY ("idEmogi") REFERENCES "Emogis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
