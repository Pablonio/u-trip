import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idPublicacion, nombre, fechaInicio, fechaFin } = req.body;

    const fecha1 = new Date(fechaInicio);
    const fecha2 = new Date(fechaFin);
    
    const paquete = await db.paqueteTuristico.create({
      data: {
        idPublicacion: idPublicacion,
        nombre: nombre,
        fechaInicio: fecha1,
        fechaFin: fecha2
      }
    });

    return res.status(200).json({ success: true, response: paquete });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
