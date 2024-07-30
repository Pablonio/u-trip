// pages/api/Publicacion/stream.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const publicaciones = await db.publicacion.findMany({
                include: {
                    usuario: true,
                    Imagen: true,
                    comentarios: {
                        include: {
                            usuario: true,
                            reaccionesComentario: true,
                            comentariosDeComentario: true,
                        },
                    },
                    reacciones: {
                        include: {
                            usuario: true,
                        },
                    },
                    emogisParaReaccionarPublicacion: {
                        include: {
                            emogiComentario: true,
                        },
                    },
                },
            });

            res.status(200).json({ success: true, response: publicaciones });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Fallo al obtener publicaciones' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
