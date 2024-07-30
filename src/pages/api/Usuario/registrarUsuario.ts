import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nombre, apellido, email, contrasena, confirmarContrasena } = req.body;

    if (!nombre || !apellido || !email || !contrasena || !confirmarContrasena) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    if (contrasena !== confirmarContrasena) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    try {
      const usuario = await db.usuario.create({
        data: {
          nombre: nombre,
          apellido: apellido,
          email: email,
          contrasena: contrasena,
          confirmarContrasena: contrasena
        }
      });

      return res.status(200).json({ success: true, response: usuario });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Error al crear el usuario' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
