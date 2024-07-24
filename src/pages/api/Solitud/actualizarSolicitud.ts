import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idSolicitud, estado } = req.body;

    const solicitud = await db.solicitud.update({
      where: {
        id: idSolicitud
      },
      data: {
        estado: estado
      }
    });

    return res.status(200).json({ success: true, response: solicitud });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}