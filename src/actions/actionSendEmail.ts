// actions.ts
import { Resend } from 'resend';

const resend = new Resend("re_gJW2usEN_5Y9PSt7LQPDjsdpuDt7EByAq");

export const sendRecoveryEmail = async (contactoRecuperacion: string) => {
  try {
    const response = await resend.emails.send({
      from: 'pblvmunoz@example.com', // Cambia esto por tu correo
      to: [contactoRecuperacion],
      subject: 'Recuperación de Cuenta',
      html: '<p>Haz clic <a href="enlace_a_tu_recuperacion">aquí</a> para recuperar tu cuenta.</p>',
    });
    console.log('Correo de recuperación enviado con éxito:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, error };
  }
};
