import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idComentario, respuesta } = req.body;

    const comentariosDeComentario = await db.comentariosDeComentario.create({
      data: {
        idComentario: idComentario,
        respuesta: respuesta
      }
    });

    return res.status(200).json({ success: true, response: comentariosDeComentario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
