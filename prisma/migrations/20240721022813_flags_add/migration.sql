-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('Eliminado', 'Nuevo');

-- AlterTable
ALTER TABLE "Comentario" ADD COLUMN     "flag" "Estado" NOT NULL DEFAULT 'Nuevo';

-- AlterTable
ALTER TABLE "ComentariosDeComentario" ADD COLUMN     "flag" "Estado" NOT NULL DEFAULT 'Nuevo';

-- AlterTable
ALTER TABLE "Imagen" ADD COLUMN     "flag" "Estado" NOT NULL DEFAULT 'Nuevo';

-- AlterTable
ALTER TABLE "Itinerarios" ADD COLUMN     "flag" "Estado" NOT NULL DEFAULT 'Nuevo';

-- AlterTable
ALTER TABLE "LugarTuristico" ADD COLUMN     "flag" "Estado" NOT NULL DEFAULT 'Nuevo';

-- AlterTable
ALTER TABLE "Publicacion" ADD COLUMN     "flag" "Estado" NOT NULL DEFAULT 'Nuevo';

-- AlterTable
ALTER TABLE "Reacciones" ADD COLUMN     "flag" "Estado" NOT NULL DEFAULT 'Nuevo';

-- AlterTable
ALTER TABLE "RecuperacionContrasena" ADD COLUMN     "flag" "Estado" NOT NULL DEFAULT 'Nuevo';

-- AlterTable
ALTER TABLE "Reserva" ADD COLUMN     "flag" "Estado" NOT NULL DEFAULT 'Nuevo';

-- AlterTable
ALTER TABLE "Solicitud" ADD COLUMN     "flag" "Estado" NOT NULL DEFAULT 'Nuevo';

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "flag" "Estado" NOT NULL DEFAULT 'Nuevo';

-- AlterTable
ALTER TABLE "emogis" ADD COLUMN     "flag" "Estado" NOT NULL DEFAULT 'Nuevo';
