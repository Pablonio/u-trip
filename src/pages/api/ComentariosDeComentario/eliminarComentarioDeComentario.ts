import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idComentarioDeComentario } = req.body;

    const comentariosDeComentario = await db.comentariosDeComentario.update({
      where: {
        id: idComentarioDeComentario
      },
      data: {
        flag: 'Eliminado'
      }
    });

    return res.status(200).json({ success: true, response: comentariosDeComentario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}