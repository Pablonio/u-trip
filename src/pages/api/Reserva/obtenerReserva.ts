//obterner todas las reservas de un usuario y sus publicaciones
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idUsuario, idPublicacion } = req.body;

    const reservas = await db.reserva.findMany({
      where: {
        idUsuario: idUsuario,
        idPublicacion: idPublicacion
      }
    });

    return res.status(200).json({ success: true, response: reservas });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}