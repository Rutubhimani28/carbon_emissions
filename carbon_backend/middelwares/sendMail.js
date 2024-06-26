import 'dotenv/config';
import ejs from 'ejs';
import pdf from 'html-pdf';
import nodemailer from "nodemailer";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = { format: 'Letter' };

const sendMail = async ({ receiver, subject, data, templateName, message }) => {
    try {
        let mailOptions = {};

        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            },
            tls: { rejectUnauthorized: false }
        });

        if (message) {            // self message. Usage, bot form
            mailOptions.from = process.env.GMAIL_FROM;
            mailOptions.to = process.env.GMAIL_FROM;
            mailOptions.subject = subject;
            mailOptions.text = message;
        } else {
            const templatePath = path.join(__dirname, '/email_templates', `${templateName}.ejs`);
            const template = await ejs.renderFile(templatePath, { data: data });
            const pdfFilePath = path.join(__dirname, 'carbon_footprint.pdf');

            console.log("---- template ", template);
            console.log("---- receiver ", receiver);

            pdf.create(template, options).toFile('./carbon_footprint.pdf', (err, res) => {
                if (err) return console.log("-------- error in pdf create ", err);

                mailOptions.from = process.env.GMAIL_FROM;
                mailOptions.to = receiver;
                mailOptions.subject = subject;
                mailOptions.attachments = [
                    {
                        filename: 'carbon_footprint.pdf',
                        path: pdfFilePath,
                        contentType: 'application/pdf'
                    }
                ];
            });
        }

        console.log("----------- mailOptions ", mailOptions);

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });

    } catch (error) {
        console.log('Error sending email:', error);
        throw error;
    }
};

export default sendMail;