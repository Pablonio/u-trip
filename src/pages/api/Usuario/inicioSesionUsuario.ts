import {db} from '../../../lib/lib'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, contrasena } = req.body;

    const usuario = await db.usuario.findFirst({
      where: {
        email: email
      }
    });
    
    if (!usuario) {
      return res.status(400).json({ success: false, error: 'No existe el usuario' });
    }
    
    if (usuario.contrasena !== contrasena) {
      return res.status(400).json({ success: false, error: 'Contraseña incorrecta' });
    }

    return res.status(200).json({ success: true, response: usuario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
