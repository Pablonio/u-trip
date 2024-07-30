import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // Asegúrate de configurar esto en tus variables de entorno

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, contrasena } = req.body;

    try {
      // Buscar usuario por email
      const usuario = await db.usuario.findFirst({
        where: { email: email }
      });

      if (!usuario) {
        return res.status(400).json({ success: false, error: 'No existe el usuario' });
      }

      // Verificar la contraseña
      const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

      if (!isMatch) {
        return res.status(400).json({ success: false, error: 'Contraseña incorrecta' });
      }

      // Crear token JWT
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        SECRET_KEY,
        { expiresIn: '1h' } // Token expira en 1 hora
      );

      // Enviar respuesta con token
      return res.status(200).json({ success: true, response: usuario, token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
