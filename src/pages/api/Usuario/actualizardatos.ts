import { NextApiRequest, NextApiResponse} from 'next';
import {db} from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'PATCH'){
        const{id,nombre, apellido, email, telefono, direccion, fotoPerfil, sexo, fechaNacimiento } = req.body;
        if(!id){
            return res.status(400).json({error: 'Id es necesario'});
        }
        try{
            const usuarioActualizado = await db.usuario.update({
                where: {id: id},
                data: {
                    nombre: nombre || undefined,
                    apellido: apellido || undefined,
                    email: email || undefined,
                    telefono: telefono || undefined,
                    direccion: direccion || undefined,
                    fotoPerfil: fotoPerfil || undefined,
                    sexo: sexo || undefined,
                    fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento):undefined
                }
            });
            return res.status(200).json({success: true, data: usuarioActualizado});
        } catch (error){
            return res.status(500).json({error: 'Fallo al actualizar usuario'});
        }
    } else{
        return res.status(400).json({error: 'Metodo no permitido'});
    }
}