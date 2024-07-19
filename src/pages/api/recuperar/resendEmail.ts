import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib'; // Asegúrate de que esta ruta sea correcta
import { Resend } from 'resend';

const API_KEY = process.env.RESEND_API_KEY; 
if (!API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}
const resend = new Resend(API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { contactoRecuperacion, ramdon } = req.body;

    if (!contactoRecuperacion || !ramdon) {
      return res.status(400).json({ success: false, error: 'Datos incompletos' });
    }

    const usuario = await db.usuario.findFirst({
      where: {
        email: contactoRecuperacion
      }
    });
    
    if (!usuario) {
      return res.status(400).json({ success: false, error: 'No existe el usuario' });
    }
    await db.recuperacionContrasena.create({
      data: {
        usuarioId: usuario.id,
        codigoRecuperacionRecibidaResend: ramdon,
        contactoRecuperacion: contactoRecuperacion
      }
    });

    console.log('Enviando correo a:', contactoRecuperacion, 'con código:', ramdon);

    try {
      const response = await resend.emails.send({
        from: 'Support U-Trip <admin@u-trip.online>',
        to: [contactoRecuperacion],
        subject: 'Recuperación de Cuenta',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dddddd; border-radius: 10px; background-color: #f9f9f9;">
            <h1 style="color: #2c3e50; text-align: center;">u-trip</h1>
            <p style="font-size: 16px; color: #555555;">Hola,</p>
            <p style="font-size: 16px; color: #555555;">Recibimos una solicitud para recuperar tu cuenta. Tu código de recuperación es:</p>
            <p style="font-size: 20px; color: #3498db; font-weight: bold; text-align: center; margin: 10px 0;">${ramdon}</p>
            <p style="font-size: 16px; color: #555555;">Por favor, haz clic en el enlace a continuación para restablecer tu contraseña:</p>
            <p style="text-align: center;">
              <a href="http://localhost:3000/Paginas/Recuperar" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px;">Recuperar Cuenta</a>
            </p>
            <p style="font-size: 16px; color: #555555;">Si no solicitaste restablecer tu contraseña, por favor ignora este correo electrónico.</p>
            <p style="font-size: 16px; color: #555555;">Gracias,<br/>El equipo de u-trip</p>
          </div>
        `,
      });
      return res.status(200).json(response.data);
    } catch (error: unknown) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).json({ success: false, error: (error as Error).message });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
