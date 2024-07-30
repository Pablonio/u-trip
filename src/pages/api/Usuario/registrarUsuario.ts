import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/lib';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // Ensure to set this in your environment variables

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nombre, apellido, email, contrasena, confirmarContrasena } = req.body;

    // Check if passwords match
    if (contrasena !== confirmarContrasena) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    try {
      // Create user in database
      const usuario = await db.usuario.create({
        data: {
          nombre,
          apellido,
          email,
          contrasena: hashedPassword, 
          confirmarContrasena: hashedPassword,
        }
      });

      // Create JWT token
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        SECRET_KEY,
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      // Send response with token
      return res.status(200).json({ success: true, response: usuario, token });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Error al crear el usuario' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
