import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { searchTerm } = req.body;

    // Validar que el searchTerm esté presente en la solicitud
    if (!searchTerm) {
      return res.status(400).json({ error: 'Falta el término de búsqueda' });
    }

    try {
      // Buscar publicaciones que coincidan con el término de búsqueda en título 
      const publicaciones = await db.publicacion.findMany({
        where: {
          OR: [
            { tituloPost: { contains: searchTerm, mode: 'insensitive' } }
          ],
          flag: 'Nuevo'
        },
        include: {
          Imagen: true,
          comentarios: {
            include: {
              usuario: {
                select: {
                  nombre: true,
                  apellido: true
                }
              }
            }
          }
        }
      });

      // Comprobar si se encontraron publicaciones
      if (publicaciones.length === 0) {
        return res.status(404).json({ error: 'No se encontraron publicaciones que coincidan con el término de búsqueda' });
      }

      return res.status(200).json({ success: true, response: publicaciones });
    } catch (error) {
      // Manejo de errores
      console.error('Error al buscar las publicaciones:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
