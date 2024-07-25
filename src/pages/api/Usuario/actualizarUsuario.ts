import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idUsuario, rol} = req.body;

    const usuario = await db.usuario.update({
      where: {
        id: idUsuario
      },
      data: {
        rol: rol
      }
    });

    return res.status(200).json({ success: true, response: usuario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}