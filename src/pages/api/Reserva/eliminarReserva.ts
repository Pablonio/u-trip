import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idReserva } = req.body;

    const reserva = await db.reserva.update({
      where: {
        id: idReserva
      },
      data: {
        flag: 'Eliminado'
      }
    });

    return res.status(200).json({ success: true, response: reserva });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}