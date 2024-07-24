-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('TURISTA', 'GUIA', 'ADMINISTRADOR', 'BANEADO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "telefono" TEXT,
    "direccion" TEXT,
    "fechaNacimiento" TIMESTAMP(3),
    "rol" "Rol" NOT NULL DEFAULT 'TURISTA',
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecuperacionContrasena" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "codigoRecuperacionRecibidaResend" TEXT NOT NULL,
    "contactoRecuperacion" TEXT NOT NULL,
    "codigoRecuperacion" TEXT,

    CONSTRAINT "RecuperacionContrasena_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_telefono_key" ON "Usuario"("telefono");

-- CreateIndex
CREATE UNIQUE INDEX "RecuperacionContrasena_codigoRecuperacionRecibidaResend_key" ON "RecuperacionContrasena"("codigoRecuperacionRecibidaResend");

-- AddForeignKey
ALTER TABLE "RecuperacionContrasena" ADD CONSTRAINT "RecuperacionContrasena_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
