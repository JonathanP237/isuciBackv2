import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function enviarCorreoConfirmacion(reqBody) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: reqBody.correousuario,
    subject: 'Confirmación de Registro a ISUCI',
    text: `¡Tu registro ha sido exitoso! Bienvenido a nuestra plataforma, ${reqBody.nombreusuario}.\n\n` +
    `Desde ahora puedes hacer uso de todas nuestras funcionalidades. Aquí están tus credenciales de acceso:\n` +
    `Usuario: ${reqBody.iddocumento}\n` +
    `Contraseña: ${reqBody.contrasenausuario}\n\n`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de confirmación enviado');
  } catch (error) {
    console.error('Error al enviar el correo de confirmación:', error);
  }
}
