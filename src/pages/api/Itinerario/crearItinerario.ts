import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idReserva, nombre, descripcion, fechaInicio, fechaFin } = req.body;

    const itinerario = await db.itinerarios.create({
      data: {
        idReserva: idReserva,
        nombre: nombre,
        descripcion: descripcion,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
      }
    });

    return res.status(200).json({ success: true, response: itinerario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}