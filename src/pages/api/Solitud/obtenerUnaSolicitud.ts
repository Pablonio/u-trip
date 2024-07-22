import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idSolicitud } = req.body;

    const solicitud = await db.solicitud.findUnique({
      where: {
        id: idSolicitud
      }
    });

    return res.status(200).json({ success: true, response: solicitud });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}