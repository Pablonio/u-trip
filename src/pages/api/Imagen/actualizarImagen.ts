import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idImagen, url, tituloImg, fechaPublicacion } = req.body;

    const imagen = await db.imagen.update({
      where: {
        id: idImagen
      },
      data: {
        url: url,
        tituloImg: tituloImg,
        fechaPublicacion: fechaPublicacion
      }
    });

    return res.status(200).json({ success: true, response: imagen });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}