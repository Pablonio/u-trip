import {NextApiRequest, NextApiResponse} from 'next';
import {db} from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'GET'){
        try{
            const publicaciones = await db.publicacion.findMany({
                select:{
                    id: true,
                    tituloPost: true,
                    fechaPublicacion: true,
                    usuario:{
                        select:{
                            id: true,
                            nombre: true,
                            apellido: true,
                        },
                    },
                    Imagen: {
                        select:{
                            id: true,
                            url: true,
                            tituloImg: true,
                        },
                    },
                    comentarios:{
                        select:{
                            id: true,
                            texto: true,
                            fechaPublicacion: true,
                            usuario:{
                                select:{
                                    id: true,
                                    nombre: true,
                                    apellido: true,
                                },
                            },
                        },
                    },
                    reacciones: {
                        select:{
                            id: true,
                            reaccion: true,
                            fechaPublicacion: true,
                            usuario:{
                                select:{
                                    id: true,
                                    nombre: true,
                                    apellido: true,
                                },
                            },
                        },
                    },
                },
            });
            if(!publicaciones){
                return res.status(404).json({success: false, error: 'Fallo al encontrar publicacion'});
            }
            return res.status(200).json({success: true, response: publicaciones});
        } catch(error){
            return res.status(500).json({success: false, error: 'Fallo al obtener publicaciones'});
        }
    } else {
        return res.status(405).json({error: 'Metod no permitido'});
    }
}