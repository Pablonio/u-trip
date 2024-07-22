import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idItinerario } = req.body;

    const itinerario = await db.itinerarios.update({
      where: {
        id: idItinerario
      },
      data: {
        flag: 'Eliminado'
      }
    });

    return res.status(200).json({ success: true, response: itinerario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}