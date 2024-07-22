import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idReaccionComentario, reaccion } = req.body;

    const reaccionesComentario = await db.reaccionesComentario.update({
      where: {
        id: idReaccionComentario
      },
      data: {
        reaccion: reaccion
      }
    });

    return res.status(200).json({ success: true, response: reaccionesComentario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}