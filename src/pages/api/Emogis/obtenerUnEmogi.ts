import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idEmogi } = req.body;

    const emogi = await db.emogis.findUnique({
      where: {
        id: idEmogi
      }
    });

    return res.status(200).json({ success: true, response: emogi });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}