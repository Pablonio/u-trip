import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { contactoRecuperacion, codigoRecuperacion } = req.body;

    if (!contactoRecuperacion || !codigoRecuperacion) {
      return res.status(400).json({ success: false, error: 'Datos incompletos' });
    }

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
    
    // Marca el código como utilizado
    await db.recuperacionContrasena.update({
      where: {
        id: recuperacionContrasena.id,
      },
      data: {
        contraseUtilizada: true,
      }
    });

    return res.status(200).json({ success: true, response: recuperacionContrasena });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
