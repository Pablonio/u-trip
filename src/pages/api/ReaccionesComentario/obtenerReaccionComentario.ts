//obtener reacciones de comentarios
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idPublicacion, idUsuario, idComentario } = req.body;

    const reaccionesComentario = await db.reaccionesComentario.findMany({
      where: {
        idPublicacion: idPublicacion,
        idUsuario: idUsuario,
        idComentario: idComentario
      }
    });

    return res.status(200).json({ success: true, response: reaccionesComentario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}