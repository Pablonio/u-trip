import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idPublicacion, idUsuario, idComentario, reaccion } = req.body;

    const reacciones = await db.reacciones.create({
      data: {
        idPublicacion: idPublicacion,
        idUsuario: idUsuario,
        reaccion: reaccion
      }
    });

    return res.status(200).json({ success: true, response: reacciones });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}