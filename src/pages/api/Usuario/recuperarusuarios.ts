import {NextApiRequest, NextApiResponse} from 'next';
import {db} from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'GET'){
        try{
            const usuarios = await db.usuario.findMany({
                select:{
                    id: true,
                    nombre: true,
                    apellido: true,
                    email: true,
                    rol: true,
                    telefono: true,
                    direccion: true
                }
            });
            if (usuarios.length === 0){
                return res.status(400).json({success: false, error: 'No se encontraron usuarios'});
            }
            return res.status(200).json({success: true, response: usuarios});
        } catch (error){
            return res.status(500).json({success: false, error: 'Fallo al obtener usuarios'});
        }
    } else{
        return res.status(405).json({error: 'Método no permitido'});
    }
}