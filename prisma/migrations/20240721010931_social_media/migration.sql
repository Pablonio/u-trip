-- CreateEnum
CREATE TYPE "EstadoSeguido" AS ENUM ('ANADIR', 'PENDIENTE', 'SEGUIDO', 'BLOQUEADO', 'DEMANDADO');

-- CreateEnum
CREATE TYPE "EstadoReserva" AS ENUM ('DISPONIBLE', 'PENDIENTE', 'RESERVADA', 'CANCELADA', 'POSTERGADA');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "fotoProfile" TEXT;

-- CreateTable
CREATE TABLE "Publicacion" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "tituloPost" TEXT NOT NULL,
    "fechaPublicacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Publicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "idPublicacion" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emogis" (
    "id" SERIAL NOT NULL,
    "idPublicacion" INTEGER NOT NULL,
    "idComentario" INTEGER NOT NULL,
    "emogi" TEXT NOT NULL,

    CONSTRAINT "emogis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imagen" (
    "id" SERIAL NOT NULL,
    "idPublicacion" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "tituloImg" TEXT,
    "fechaPublicacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Imagen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reacciones" (
    "id" SERIAL NOT NULL,
    "idPost" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idComentario" INTEGER NOT NULL,
    "reaccion" TEXT NOT NULL,
    "fechaPublicacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reacciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitud" (
    "id" SERIAL NOT NULL,
    "idUsuarioEnvia" INTEGER NOT NULL,
    "idUsuarioAcepta" INTEGER NOT NULL,
    "estado" "EstadoSeguido" NOT NULL DEFAULT 'ANADIR',

    CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LugarTuristico" (
    "id" SERIAL NOT NULL,
    "idPublicacion" INTEGER NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "Departamento" TEXT NOT NULL,
    "barrio" TEXT NOT NULL,
    "calle" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,

    CONSTRAINT "LugarTuristico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idPublicacion" INTEGER NOT NULL,
    "estado" "EstadoReserva" NOT NULL DEFAULT 'DISPONIBLE',
    "fechaReserva" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Itinerarios" (
    "id" SERIAL NOT NULL,
    "idReserva" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Itinerarios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Publicacion" ADD CONSTRAINT "Publicacion_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_idPublicacion_fkey" FOREIGN KEY ("idPublicacion") REFERENCES "Publicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emogis" ADD CONSTRAINT "emogis_idPublicacion_fkey" FOREIGN KEY ("idPublicacion") REFERENCES "Publicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emogis" ADD CONSTRAINT "emogis_idComentario_fkey" FOREIGN KEY ("idComentario") REFERENCES "Publicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagen" ADD CONSTRAINT "Imagen_idPublicacion_fkey" FOREIGN KEY ("idPublicacion") REFERENCES "Publicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reacciones" ADD CONSTRAINT "Reacciones_idPost_fkey" FOREIGN KEY ("idPost") REFERENCES "Publicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reacciones" ADD CONSTRAINT "Reacciones_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reacciones" ADD CONSTRAINT "Reacciones_idComentario_fkey" FOREIGN KEY ("idComentario") REFERENCES "Comentario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_idUsuarioEnvia_fkey" FOREIGN KEY ("idUsuarioEnvia") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_idUsuarioAcepta_fkey" FOREIGN KEY ("idUsuarioAcepta") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LugarTuristico" ADD CONSTRAINT "LugarTuristico_idPublicacion_fkey" FOREIGN KEY ("idPublicacion") REFERENCES "Publicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_idPublicacion_fkey" FOREIGN KEY ("idPublicacion") REFERENCES "Publicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerarios" ADD CONSTRAINT "Itinerarios_idReserva_fkey" FOREIGN KEY ("idReserva") REFERENCES "Reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
