-- CreateTable
CREATE TABLE "ComentariosDeComentario" (
    "id" SERIAL NOT NULL,
    "idComentario" INTEGER NOT NULL,
    "respuesta" TEXT NOT NULL,

    CONSTRAINT "ComentariosDeComentario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ComentariosDeComentario" ADD CONSTRAINT "ComentariosDeComentario_idComentario_fkey" FOREIGN KEY ("idComentario") REFERENCES "Comentario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
