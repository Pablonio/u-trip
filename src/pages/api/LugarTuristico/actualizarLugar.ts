import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idLugarTuristico, latitud, longitud, Departamento, barrio, calle, ciudad, pais, provincia } = req.body;

    const lugarTuristico = await db.lugarTuristico.update({
      where: {
        id: idLugarTuristico
      },
      data: {
        latitud: latitud,
        longitud: longitud,
        Departamento: Departamento,
        barrio: barrio,
        calle: calle,
        ciudad: ciudad,
        pais: pais,
        provincia: provincia
      }
    });

    return res.status(200).json({ success: true, response: lugarTuristico });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}