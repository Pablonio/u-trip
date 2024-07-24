/*
  Warnings:

  - You are about to drop the column `idPublicacion` on the `Reserva` table. All the data in the column will be lost.
  - Added the required column `idPaquete` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_idPublicacion_fkey";

-- AlterTable
ALTER TABLE "Reserva" DROP COLUMN "idPublicacion",
ADD COLUMN     "idPaquete" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PaqueteTuristico" (
    "id" SERIAL NOT NULL,
    "idReserva" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "idPublicacion" INTEGER NOT NULL,
    "flag" "Estado" NOT NULL DEFAULT 'Nuevo',

    CONSTRAINT "PaqueteTuristico_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaqueteTuristico" ADD CONSTRAINT "PaqueteTuristico_idPublicacion_fkey" FOREIGN KEY ("idPublicacion") REFERENCES "Publicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_idPaquete_fkey" FOREIGN KEY ("idPaquete") REFERENCES "PaqueteTuristico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
