
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { idPublicacion, emogiNombre } = req.body;


        const emogis = await db.emogis.create({
            data: {
                idPublicacion: idPublicacion,
                emogi: emogiNombre
            }
        });

        return res.status(200).json({ success: true, response: emogis });
    } else {
        return res.status(405).json({ error: 'Método no permitido' });
    }
}
