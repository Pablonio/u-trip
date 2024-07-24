import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';
import formidable, { IncomingForm } from 'formidable'; 
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Configura formidable para aceptar archivos
export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadDir = path.join(process.cwd(), 'public/uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const form = new IncomingForm({ // Updated to use IncomingForm
            uploadDir,
            keepExtensions: true,
            filename: (name, ext, path) => `${uuidv4()}${ext}`,
        });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'Error al subir la imagen' });
            }

            const { tituloImg, idPublicacion } = fields;
            const fileArray = files.file as formidable.File[] | undefined;

            if (!fileArray || fileArray.length === 0) {
                return res.status(400).json({ error: 'No se encontró ninguna imagen' });
            }

            const file = fileArray[0];
            const filePath = `/uploads/${path.basename(file.filepath)}`;

            try {
                const imagen = await db.imagen.create({
                    data: {
                        tituloImg: String(tituloImg),
                        url: filePath,
                        idPublicacion: Number(idPublicacion),
                    },
                });

                return res.status(200).json({ response: imagen });
            } catch (error) {
                console.error('Error al guardar la imagen en la base de datos:', error);
                return res.status(500).json({ error: 'Error al guardar la imagen en la base de datos' });
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
