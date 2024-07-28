import {NextApiRequest, NextApiResponse} from 'next';
import {db} from '../../../lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === "GET") {
        try{
            const reservas = await db.reserva.findMany({
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nombre: true,
                            apellido: true,
                            email: true,
                        }
                    },
                    paquete: {
                        select:{
                            id: true,
                            nombre: true,
                            fechaInicio: true,
                            fechaFin: true,
                        }
                    },
                    itinerarios: {
                        select: {
                            id: true,
                            nombre: true,
                            descripcion: true,
                            fechaInicio: true,
                            fechaFin: true,
                        }
                    }
                }
            });
            if(reservas.length === 0){
                return res.status(404).json({success: false, message: 'No hay reservas'});
            }
            return res.status(200).json({success: true, response: reservas});
        } catch (error){
            console.log('Fallo al recuperar las reservas', error);
            return res.status(500).json({success: false, message: 'Fallo al obtener las reservas'});
        }
    } else {
        return res.status(405).json({error: 'Metodo no permitido'});
    }
}