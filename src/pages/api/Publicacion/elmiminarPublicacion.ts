import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idPublicacion } = req.body;

    const publicacion = await db.publicacion.update({
      where: {
        id: idPublicacion
      },
      data: {
        flag: 'Eliminado'
      }
    });

    return res.status(200).json({ success: true, response: publicacion });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}