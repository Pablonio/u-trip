import { NextApiRequest, NextApiResponse } from 'next';
import {db} from '../../../lib/lib'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nombre, apellido, email, contrasena, confirmarContrasena } = req.body;

    const usuario = await db.usuario.create({
      data: {
        nombre: nombre,
        apellido: apellido,
        email: email,
        contrasena: contrasena,
        confirmarContrasena: contrasena,
      }
    });

    return res.status(200).json({ success: true, response: usuario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}