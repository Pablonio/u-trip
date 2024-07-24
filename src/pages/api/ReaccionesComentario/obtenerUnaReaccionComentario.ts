import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idReaccionComentario } = req.body;

    const reaccionComentario = await db.reaccionesComentario.findUnique({
      where: {
        id: idReaccionComentario
      }
    });

    return res.status(200).json({ success: true, response: reaccionComentario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}