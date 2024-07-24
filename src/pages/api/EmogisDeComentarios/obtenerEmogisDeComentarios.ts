import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idEmogi } = req.body;

    const emogisDeComentarios = await db.emogisComentario.findMany({
      where: {
        idEmogi: idEmogi,
      }
    });

    return res.status(200).json({ success: true, response: emogisDeComentarios });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}