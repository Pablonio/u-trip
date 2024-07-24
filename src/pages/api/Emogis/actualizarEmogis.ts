//actualizar emogi de una publicacion
import { NextApiRequest, NextApiResponse } from 'next'; // Asegúrate de que esta ruta sea correcta
import { db } from '../../../lib/lib'; // Asegúrate de que esta ruta sea correcta

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PATCH') {
        const { idEmogi, emogi } = req.body;

        const emogis = await db.emogis.update({
            where: {
                id: idEmogi
            },
            data: {
                emogi: emogi
            }
        });

        return res.status(200).json({ success: true, response: emogis });
    } else {
        return res.status(405).json({ error: 'Método no permitido' });
    }
}