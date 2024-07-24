import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib'; // Asegúrate de que esta ruta sea correcta

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { idPublicacion, latitud, longitud, Departamento, barrio, calle, ciudad, pais, provincia } = req.body;
        const lugar = await db.lugarTuristico.create({
            data: {
                idPublicacion: idPublicacion,
                latitud: parseFloat(latitud),
                longitud: parseFloat(longitud),
                Departamento: Departamento,
                barrio: barrio,
                calle: calle,
                ciudad: ciudad,
                pais: pais,
                provincia: provincia
            }
        });
        return res.status(200).json({ success: true, response: lugar });
    } else {
        return res.status(405).json({ error: 'Método no permitido' });
    } 
  }