import nodemailer from "nodemailer"
import 'dotenv/config';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    // host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    },
    tls: { rejectUnauthorized: false }
});


const sendMail = async ({ receiver, subject, data, templateName }) => {
    try {
        const templatePath = path.join(__dirname, '/email_templates', `${templateName}.ejs`);
        const template = await ejs.renderFile(templatePath, { data: data });

        const mailOptions = {
            from: process.env.GMAIL_FROM,
            to: receiver,
            subject: subject,
            html: template
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info?.response);
        return info;
    } catch (error) {
        console.log('Error sending email:', error);
        throw error;
    }
};

export default sendMail;