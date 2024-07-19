import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const API_KEY = process.env.RESEND_API_KEY; 
const resend = new Resend(API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { contactoRecuperacion,  codigoCreadoRadio } = req.body;
    console.log(contactoRecuperacion, codigoCreadoRadio)

    try {
      const response = await resend.emails.send({
        from: 'Support U-Trip <admin@u-trip.online>',
        to: [contactoRecuperacion],
        subject: 'Recuperación de Cuenta',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dddddd; border-radius: 10px;">
            <h1 style="color: #2c3e50; text-align: center;">u-trip</h1>
            <p style="font-size: 16px; color: #555555;">Hola,</p>
            <p style="font-size: 16px; color: #555555;">Recibimos una solicitud para recuperar tu cuenta. Por favor, haz clic en el enlace a continuación para restablecer tu contraseña:</p>
            <p style="text-align: center;">
              <a href="${codigoCreadoRadio}" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px;">Recuperar Cuenta</a>
            </p>
            <p style="font-size: 16px; color: #555555;">Si no solicitaste restablecer tu contraseña, por favor ignora este correo electrónico.</p>
            <p style="font-size: 16px; color: #555555;">Gracias,<br/>El equipo de u-trip</p>
          </div>
        `,
      });

      return res.status(200).json(response.data);
    } catch (error: unknown) {
      return res.status(500).json({ success: false, error: (error as Error).message });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
