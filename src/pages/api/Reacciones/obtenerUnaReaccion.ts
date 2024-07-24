import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idReaccion } = req.body;

    const reaccion = await db.reacciones.findUnique({
      where: {
        id: idReaccion
      }
    });

    return res.status(200).json({ success: true, response: reaccion });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}