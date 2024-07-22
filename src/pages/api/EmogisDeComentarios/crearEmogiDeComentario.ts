import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idEmogi, emogiComentario } = req.body;

    const emogisDeComentario = await db.emogisComentario.create({
      data: {
        idEmogi: idEmogi,
        emogiComentario: emogiComentario
      }
    });

    return res.status(200).json({ success: true, response: emogisDeComentario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}