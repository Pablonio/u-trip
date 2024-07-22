import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idImagen } = req.body;

    const imagen = await db.imagen.update({
      where: {
        id: idImagen
      },
      data: {
        flag: 'Eliminado'
      }
    });

    return res.status(200).json({ success: true, response: imagen });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}