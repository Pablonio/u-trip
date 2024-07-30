/*
  Warnings:

  - The values [DISPONIBLE,RESERVADA,POSTERGADA] on the enum `EstadoReserva` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "EstadoPaquete" AS ENUM ('CANCELADO', 'ACTIVO');

-- CreateEnum
CREATE TYPE "EstadoDeuda" AS ENUM ('PAGADO', 'PENDIENTE');

-- AlterEnum
BEGIN;
CREATE TYPE "EstadoReserva_new" AS ENUM ('ACEPTADA', 'PENDIENTE', 'CANCELADA');
ALTER TABLE "Reserva" ALTER COLUMN "estado" DROP DEFAULT;
ALTER TABLE "Reserva" ALTER COLUMN "estado" TYPE "EstadoReserva_new" USING ("estado"::text::"EstadoReserva_new");
ALTER TYPE "EstadoReserva" RENAME TO "EstadoReserva_old";
ALTER TYPE "EstadoReserva_new" RENAME TO "EstadoReserva";
DROP TYPE "EstadoReserva_old";
ALTER TABLE "Reserva" ALTER COLUMN "estado" SET DEFAULT 'ACEPTADA';
COMMIT;

-- AlterTable
ALTER TABLE "PaqueteTuristico" ADD COLUMN     "estadoPaquete" "EstadoPaquete" NOT NULL DEFAULT 'ACTIVO',
ADD COLUMN     "precio" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Reserva" ADD COLUMN     "deuda" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "estadoDeuda" "EstadoDeuda" NOT NULL DEFAULT 'PENDIENTE',
ADD COLUMN     "saldado" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "estado" SET DEFAULT 'ACEPTADA';

-- CreateTable
CREATE TABLE "CompartirPublicacion" (
    "id" SERIAL NOT NULL,
    "idPublicacion" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "flag" "Estado" NOT NULL DEFAULT 'Nuevo',

    CONSTRAINT "CompartirPublicacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompartirPublicacion" ADD CONSTRAINT "CompartirPublicacion_idPublicacion_fkey" FOREIGN KEY ("idPublicacion") REFERENCES "Publicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompartirPublicacion" ADD CONSTRAINT "CompartirPublicacion_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
