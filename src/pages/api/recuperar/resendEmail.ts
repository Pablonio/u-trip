import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const API_KEY = process.env.RESEND_API_KEY; // Usa la variable de entorno
const resend = new Resend(API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { contactoRecuperacion } = req.body;

    try {
      const response = await resend.emails.send({
        from: 'b7f8b2337e28477a991fb75bfc9cc8fe@domainsbyproxy.com',
        to: [contactoRecuperacion],
        subject: 'Recuperación de Cuenta',
        html: '<p>Haz clic <a href="enlace_a_tu_recuperacion">aquí</a> para recuperar tu cuenta.</p>',
      });
      return res.status(200).json({ success: true, response });
    } catch (error: unknown) {
      return res.status(500).json({ success: false, error: (error as Error).message });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
