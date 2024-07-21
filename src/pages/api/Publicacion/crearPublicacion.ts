import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idUsuario, tituloPost, fechaPublicacion } = req.body;

    const publicacion = await db.publicacion.create({
      data: {
        idUsuario: idUsuario,
        tituloPost: tituloPost,
        fechaPublicacion: fechaPublicacion
      }
    });

    return res.status(200).json({ success: true, response: publicacion });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}