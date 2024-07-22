import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idLugarTuristico } = req.body;

    const lugarTuristico = await db.lugarTuristico.findUnique({
      where: {
        id: idLugarTuristico
      }
    });

    return res.status(200).json({ success: true, response: lugarTuristico });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}