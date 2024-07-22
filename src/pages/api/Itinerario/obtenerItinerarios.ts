import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idReserva } = req.body;

    const itinerarios = await db.itinerarios.findMany({
      where: {
        idReserva: idReserva
      }
    });

    return res.status(200).json({ success: true, response: itinerarios });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}