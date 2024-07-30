import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib'; // Asegúrate de que esta ruta sea correcta

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idPublicacion, nombre, fechaInicio, fechaFin, precio } = req.body;

    if (!idPublicacion || !nombre || !fechaInicio || !fechaFin || !precio) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const fecha1 = new Date(fechaInicio);
    const fecha2 = new Date(fechaFin);

    try {
      const paquete = await db.paqueteTuristico.create({
        data: {
          idPublicacion,
          nombre: nombre,
          fechaInicio: fecha1,
          fechaFin: fecha2,
          precio: parseInt(precio),
          estadoPaquete: 'ACTIVO',
        }
      });

      return res.status(200).json({ success: true, response: paquete });
    } catch (error) {
      console.error("Error creating paqueteTuristico: ", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}