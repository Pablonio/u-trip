//craer emogi de una publicacion
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib'; // Asegúrate de que esta ruta sea correcta

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { idPublicacion, idEmogi, emogi } = req.body;

        const emogis = await db.emogis.create({
            data: {
                idPublicacion: idPublicacion,
                emogi: emogi
            }
        });

        return res.status(200).json({ success: true, response: emogis });
    } else {
        return res.status(405).json({ error: 'Método no permitido' });
    }
}
        