import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { codigoRecuperacion } = req.body;

    if (!codigoRecuperacion) {
      return res.status(400).json({ success: false, error: 'Código de recuperación requerido' });
    }

    // Busca el registro en la base de datos usando el código de recuperación
    const recuperacionContrasena = await db.recuperacionContrasena.findFirst({
      where: {
        codigoRecuperacionRecibidaResend: codigoRecuperacion
      }
    });
    
    // Si no se encuentra el registro, retorna un error
    if (!recuperacionContrasena) {
      return res.status(400).json({ success: false, error: 'Código de recuperación no válido' });
    }
    
    // Actualiza el registro marcando el código como utilizado
    const updatedRecuperacion = await db.recuperacionContrasena.update({
      where: {
        id: recuperacionContrasena.id
      },
      data: {
        contraseUtilizada: true
      }
    });

    return res.status(200).json({ success: true, response: updatedRecuperacion });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
