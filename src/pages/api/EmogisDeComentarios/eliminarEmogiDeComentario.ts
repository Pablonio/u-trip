import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idEmogiComentario } = req.body;

    const emogisDeComentario = await db.emogisComentario.update({
      where: {
        id: idEmogiComentario
      },
      data: {
        flag: 'Eliminado'
      }
    });

    return res.status(200).json({ success: true, response: emogisDeComentario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}