import {NextApiRequest, NextApiResponse} from 'next';
import {db} from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method === "GET") {
    try {
      const itinerarios = await db.itinerarios.findMany({
        select: {
          id: true,
          nombre: true,
          descripcion: true,
          fechaInicio: true,
          fechaFin: true,
        },
      });
      if (itinerarios.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No hay itinerarios" });
      }
      return res.status(200).json({ success: true, response: itinerarios });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Fallo al obtener itinerarios" });
    }
  } else {
    return res.status(400).json({ error: "Metodo no permitido" });
  }
}

