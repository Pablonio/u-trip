import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';
import { cors } from '../../../lib/cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  await cors(req, res, async () => {
    if (req.method === 'POST') {
      const { idComentario } = req.body; 
          
      const comentario = await db.comentario.findUnique({
        where: {
          id: idComentario
        }
      });  
          
      return res.status(200).json({ success: true, response: comentario });
    } else {
      return res.status(405).json({ error: 'Método no permitido' });
    }
  });   
};