//obtener todas las publicaciones de un usuario
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idUsuario } = req.body;

    const publicaciones = await db.publicacion.findMany({
      where: {
        idUsuario: idUsuario,
        flag: 'Nuevo'
      },
      include:{
        Imagen: true,
        comentarios:{
          include:{
            usuario:{
              select:{
                nombre: true,
                apellido: true
              }
            }
          }
        }
      }
    });

    return res.status(200).json({ success: true, response: publicaciones });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}