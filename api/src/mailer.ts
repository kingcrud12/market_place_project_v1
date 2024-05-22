import nodemailer from 'nodemailer';
import { mdp_mail, user_mail } from './secret';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // J'utilise un serveur SMTP
    port: 587,
    secure: false, // true for 587, false for other ports
    auth: {
        user: user_mail, // votre adresse email
        pass: mdp_mail, // votre mot de passe d'applications
    },
});

export const sendConfirmationEmail = (to: string, subject: string, text: string) => {
    const mailOptions = {
        from: user_mail, // votre adresse email
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};
