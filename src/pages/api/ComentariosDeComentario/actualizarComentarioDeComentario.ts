import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';
import { cors } from '../../../lib/cors';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res, async () => {
    if (req.method === 'PATCH') {
      const { idComentarioDeComentario, respuesta } = req.body;

      const comentariosDeComentario = await db.comentariosDeComentario.update({
        where: {
          id: idComentarioDeComentario
        },
        data: {
          respuesta: respuesta
        }
      });

      return res.status(200).json({ success: true, response: comentariosDeComentario });
    } else {
      return res.status(405).json({ error: 'Método no permitido' });
    }
  });
}