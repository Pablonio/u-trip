import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idPublicacion, idUsuario, texto } = req.body;

    const comentario = await db.comentario.create({
      data: {
        idPublicacion: idPublicacion,
        idUsuario: idUsuario,
        texto: texto
      }
    });

    return res.status(200).json({ success: true, response: comentario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}