//Eliminar un comentario usando el flag de nuevo a eliminado
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idComentario } = req.body;

    const comentario = await db.comentario.update({
      where: {
        id: idComentario
      },
      data: {
        flag: 'Eliminado'
      }
    });

    return res.status(200).json({ success: true, response: comentario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}