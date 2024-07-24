import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idUsuario, idPaquete, estado, itinerarios, fechaReserva } = req.body;

    const reserva = await db.reserva.create({
      data: {
        idPaquete: idPaquete,
        idUsuario: idUsuario,
        estado: estado,
        itinerarios: itinerarios,
        fechaReserva: fechaReserva
      }
    });

    return res.status(200).json({ success: true, response: reserva });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}   