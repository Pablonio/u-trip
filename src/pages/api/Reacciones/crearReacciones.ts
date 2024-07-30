import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idPublicacion, idUsuario, reaccion } = req.body;

    // Verificar si el usuario ya reaccionó a esta publicación
    const existingReaction = await db.reacciones.findFirst({
      where: {
        idPublicacion: idPublicacion,
        idUsuario: idUsuario
      }
    });

    if (existingReaction) {
      // Si la reacción es la misma y no está eliminada, eliminarla (cambiar flag a 'Eliminado')
      if (existingReaction.reaccion === reaccion && existingReaction.flag !== 'Eliminado') {
        await db.reacciones.update({
          where: {
            id: existingReaction.id
          },
          data: {
            flag: 'Eliminado'
          }
        });
        return res.status(200).json({ success: true, message: 'Reacción eliminada' });
      }

      // Si la reacción es diferente o está eliminada, actualizarla
      if (existingReaction.reaccion !== reaccion || existingReaction.flag === 'Eliminado') {
        await db.reacciones.update({
          where: {
            id: existingReaction.id
          },
          data: {
            reaccion: reaccion,
            flag: 'Nuevo'
          }
        });
        return res.status(200).json({ success: true, message: 'Reacción actualizada' });
      }
    } else {
      // Crear una nueva reacción
      const newReaction = await db.reacciones.create({
        data: {
          idPublicacion: idPublicacion,
          idUsuario: idUsuario,
          reaccion: reaccion,
          flag: 'Nuevo'
        }
      });
      return res.status(200).json({ success: true, response: newReaction });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
