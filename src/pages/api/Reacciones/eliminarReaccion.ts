import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idReaccion } = req.body;

    const reacciones = await db.reacciones.update({
      where: {
        id: idReaccion
      },
      data: {
        flag: 'Eliminado'
      }
    });

    return res.status(200).json({ success: true, response: reacciones });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}