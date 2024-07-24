import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { correo, contrasena } = req.body;

    try {
      // Busca el usuario por el correo
      const usuario = await db.usuario.findUnique({
        where: {
          email: correo,
        },
      });

      if (!usuario) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
      }

      // Actualiza la contraseña del usuario
      const updatedUsuario = await db.usuario.update({
        where: {
          id: usuario.id, // Utiliza el ID del usuario
        },
        data: {
          contrasena: contrasena,
          confirmarContrasena: contrasena,
        },
      });

      return res.status(200).json({ success: true, response: updatedUsuario });
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      return res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}

