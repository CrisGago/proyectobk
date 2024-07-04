// src/services/emailService.js

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'cris7gh@gmail.com',
        pass: 'qelk guew piuf yfdb'
    }
});

const sendPasswordResetEmail = async (email, token) => {
    const resetLink = `http://localhost:8080/api/auth/forgot-password?token=${token}`;
    //http://localhost:8080/api/auth/forgot-password
    //`http://yourdomain.com/reset-password?token=${token}`

    const mailOptions = {
        from: 'cris7gh@gmail.com',
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetLink}`
    };

    await transporter.sendMail(mailOptions);
};

export { sendPasswordResetEmail };
