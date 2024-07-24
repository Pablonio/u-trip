import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { idUsuario, nombre, apellido, email, direccion, fechaNacimiento, telefono, fotoPerfil} = req.body;

    const usuario = await db.usuario.update({
      where: {
        id: idUsuario
      },
      data: {
        nombre: nombre,
        apellido: apellido,
        email: email,
        direccion: direccion,
        fechaNacimiento: fechaNacimiento,
        telefono: telefono,
        fotoPerfil: fotoPerfil
      }
    });

    return res.status(200).json({ success: true, response: usuario });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}