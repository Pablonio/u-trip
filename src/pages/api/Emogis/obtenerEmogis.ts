import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idPublicacion } = req.body;

    const emogis = await db.emogis.findMany({
      where: {
        idPublicacion: idPublicacion
      }
    });

    return res.status(200).json({ success: true, response: emogis });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}