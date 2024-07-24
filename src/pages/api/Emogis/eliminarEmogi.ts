import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idEmogi } = req.body;

    const emogis = await db.emogis.update({
      where: {
        id: idEmogi
      },
      data: {
        flag: 'Eliminado'
      }
    });

    return res.status(200).json({ success: true, response: emogis });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}