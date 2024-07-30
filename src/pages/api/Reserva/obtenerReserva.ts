import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idUsuario, idPublicacion } = req.body;

    try {
      const reservas = await db.reserva.findMany({
        where: {
          idUsuario: idUsuario,
          paquete: {
            idPublicacion: idPublicacion
          }
        },
        include: {
          paquete: true,
          usuario: true
        }
      });

      return res.status(200).json({ success: true, response: reservas });
    } catch (error) {
      console.error("Error fetching reservas: ", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
