//obtener todas las solicitudes 
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idUsuario, idUsuarioAcepta } = req.body;

    const solicitudes = await db.solicitud.findMany({
      where: {
        idUsuarioEnvia: idUsuario,
        idUsuarioAcepta: idUsuarioAcepta
      }
    });

    return res.status(200).json({ success: true, response: solicitudes });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}