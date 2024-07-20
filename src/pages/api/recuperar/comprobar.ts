import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { contactoRecuperacion, codigoRecuperacion } = req.body;

    if (!contactoRecuperacion || !codigoRecuperacion) {
      return res.status(400).json({ success: false, error: 'Datos incompletos' });
    }

    try {
      // Busca el registro de recuperación con el contacto y el código proporcionado
      const recuperacionContrasena = await db.recuperacionContrasena.findFirst({
        where: {
          contactoRecuperacion,
          codigoRecuperacionRecibidaResend: codigoRecuperacion,
        }
      });

      if (!recuperacionContrasena) {
        return res.status(400).json({ success: false, error: 'Código de recuperación inválido o no coincide con el usuario' });
      }

      if (recuperacionContrasena.contrasenafueutilizada) {
        return res.status(400).json({ success: false, error: 'El código de recuperación ya ha sido utilizado' });
      }

      // Marca el código como utilizado
      const updatedRecuperacionContrasena = await db.recuperacionContrasena.update({
        where: {
          id: recuperacionContrasena.id,
        },
        data: {
          contrasenafueutilizada: true,
        }
      });

      return res.status(200).json({ success: true, response: updatedRecuperacionContrasena });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      return res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
