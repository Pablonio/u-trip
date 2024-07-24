import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idPublicacion, idUsuario, reaccion } = req.body;

    const reacciones = await db.reacciones.findMany({
      where: {
        idPublicacion: idPublicacion,
        idUsuario: idUsuario
      }
    });

    return res.status(200).json({ success: true, response: reacciones });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}