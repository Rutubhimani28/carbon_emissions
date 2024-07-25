import 'dotenv/config';
import ejs from 'ejs';
import pdf from 'html-pdf';
import nodemailer from "nodemailer";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = { format: 'Letter' };

// Prev
// const sendMail = async ({ receiver, subject, data, templateName, message, activityName, name, totalTonCo2, eveydolarCo2 }) => {
//     try {
//         let mailOptions = {};

//         const transporter = nodemailer.createTransport({
//             // host: 'smtp.office365.com',
//             host: 'smtpout.secureserver.net',
//             port: 587,
//             secure: false,
//             auth: {
//                 user: process.env.GMAIL_USER,
//                 pass: process.env.GMAIL_PASSWORD
//             },
//             tls: { rejectUnauthorized: false }
//         });

//         if (message) {
//             mailOptions = {
//                 from: process.env.GMAIL_FROM,
//                 to: process.env.GMAIL_FROM,
//                 subject: subject,
//                 text: message
//             };
//         } else {
//             const templatePath = path.join(__dirname, '/email_templates', `${templateName}.ejs`);
//             const template = await ejs.renderFile(templatePath, { data: data, name, activityName, totalTonCo2, eveydolarCo2 });
//             // const pdfFilePath = path.join(__dirname, 'carbon_footprint.pdf');

//             // await new Promise((resolve, reject) => {
//             //     pdf.create(template, options).toFile(pdfFilePath, (err, res) => {
//             //         if (err) {
//             //             console.log("-------- error in pdf create ", err);
//             //             reject(err);
//             //         } else {
//             //             mailOptions = {
//             //                 from: process.env.GMAIL_FROM,
//             //                 to: receiver,
//             //                 subject: subject,
//             //                 attachments: [
//             //                     {
//             //                         filename: 'carbon_footprint.pdf',
//             //                         path: pdfFilePath,
//             //                         contentType: 'application/pdf'
//             //                     }
//             //                 ]
//             //             };
//             //             resolve();
//             //         }
//             //     });
//             // });

//             mailOptions = {
//                 from: process.env.GMAIL_FROM,
//                 to: receiver,
//                 subject: subject,
//                 html: template
//             };
//         }

//         // Send email
//         await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully');

//     } catch (error) {
//         console.log('Error sending email:', error);
//         throw error;
//     }
// };

const sendMail = async ({ receiver, subject, data, templateName, message, activityName, name, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData, isAttachment }) => {
    try {
        let mailOptions = {};

        const transporter = nodemailer.createTransport({
            // host: 'smtp.office365.com',
            host: 'smtpout.secureserver.net',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            },
            tls: { rejectUnauthorized: false }
        });

        if (message) {
            mailOptions = {
                from: process.env.GMAIL_FROM,
                to: process.env.GMAIL_FROM,
                subject: subject,
                text: message
            };
        } else {
            const templatePath = path.join(__dirname, '/email_templates', `${templateName}.ejs`);
            const template = await ejs.renderFile(templatePath, { data: data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData });

            if (isAttachment) {   // to attach pdf to mail
                // const pdfFilePath = path.join(__dirname, 'carbon_footprint.pdf');

                // await new Promise((resolve, reject) => {
                //     pdf.create(template, options).toFile(pdfFilePath, (err, res) => {
                //         if (err) {
                //             console.log("-------- error in pdf create ", err);
                //             reject(err);
                //         } else {
                //             mailOptions = {
                //                 from: process.env.GMAIL_FROM,
                //                 to: receiver,
                //                 subject: subject,
                //                 attachments: [
                //                     {
                //                         filename: 'carbon_footprint.pdf',
                //                         path: pdfFilePath,
                //                         contentType: 'application/pdf'
                //                     }
                //                 ]
                //             };
                //             resolve();
                //         }
                //     });
                // });
            }
            else {
                mailOptions = {
                    from: process.env.GMAIL_FROM,
                    to: receiver,
                    subject: subject,
                    html: template
                };
            }
        }

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

    } catch (error) {
        console.log('Error sending email:', error);
        throw error;
    }
};

export default sendMail;
