// using puppeteer
import puppeteer from 'puppeteer';
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    format: 'A4',
    printBackground: true,
    margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
    },
    landscape: false
};
const sendMail = async ({
    receiver,
    subject,
    data,
    emailBodyTemplateName,
    attachmentTemplateName,
    message,
    activityName,
    name,
    totalTonCo2,
    eveydolarCo2,
    mailVerifiLink,
    resetPswdLink,
    resultTableData
}) => {
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
            if (attachmentTemplateName && emailBodyTemplateName) {

                const attachmentTemplatePath = path.join(__dirname, '/email_templates', `${attachmentTemplateName}.ejs`);
                const emailBodyTemplatePath = path.join(__dirname, '/email_templates', `${emailBodyTemplateName}.ejs`);

                const [attachmentTemplate, emailBodyTemplate] = await Promise.all([
                    ejs.renderFile(attachmentTemplatePath, { subject, data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData }),
                    ejs.renderFile(emailBodyTemplatePath, { subject, data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData })
                ]);

                const pdfFilePath = path.join(__dirname, 'carbon_footprint.pdf');

                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setContent(attachmentTemplate);
                await page.pdf({ ...options, path: pdfFilePath });  // Save PDF locally
                await browser.close();

                mailOptions = {
                    from: process.env.GMAIL_FROM,
                    to: receiver,
                    subject: subject,
                    html: emailBodyTemplate,
                    attachments: [
                        {
                            filename: 'carbon_footprint.pdf',
                            path: pdfFilePath,
                            contentType: 'application/pdf'
                        }
                    ]
                };

            } else if (attachmentTemplateName) {
                const attachmentTemplatePath = path.join(__dirname, '/email_templates', `${attachmentTemplateName}.ejs`);
                const attachmentTemplate = await ejs.renderFile(attachmentTemplatePath, { data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData });

                const pdfFilePath = path.join(__dirname, 'carbon_footprint.pdf');

                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setContent(attachmentTemplate);
                await page.pdf({ ...options, path: pdfFilePath });

                mailOptions = {
                    from: process.env.GMAIL_FROM,
                    to: receiver,
                    subject: subject,
                    attachments: [
                        {
                            filename: 'carbon_footprint.pdf',
                            path: pdfFilePath,
                            contentType: 'application/pdf'
                        }
                    ]
                };

            } else {
                const bodyTemplatePath = path.join(__dirname, '/email_templates', `${emailBodyTemplateName}.ejs`);
                const bodyTemplate = await ejs.renderFile(bodyTemplatePath, { data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData });

                mailOptions = {
                    from: process.env.GMAIL_FROM,
                    to: receiver,
                    subject: subject,
                    html: bodyTemplate
                };
            }
        }

        // Send email
        // await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        // if (fs.existsSync(pdfFilePath)) {
        //     fs.unlinkSync(pdfFilePath);  // Remove the file after sending the email
        // }

    } catch (error) {
        console.log('Error sending email:', error);
        throw error;
    }
};

export default sendMail;


// Using html-pdf
// import 'dotenv/config';
// import ejs from 'ejs';
// import pdf from 'html-pdf';
// import nodemailer from "nodemailer";
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // const options = { format: 'Letter' };
// const options = {
//     format: 'A4',
//     orientation: 'portrait',
//     border: '1cm',
//     type: 'pdf',
//     quality: '75'
// };

// const sendMail = async ({ receiver, subject, data, emailBodyTemplateName, attachmentTemplateName, message, activityName, name, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData }) => {
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

//         if (message) {             // chatbot, buyCredits
//             mailOptions = {
//                 from: process.env.GMAIL_FROM,
//                 to: process.env.GMAIL_FROM,
//                 subject: subject,
//                 text: message
//             };
//         } else {

//             if (attachmentTemplateName && emailBodyTemplateName) {   // to attach pdf to mail + template in email body
//                 const attachmentTemplatePath = path.join(__dirname, '/email_templates', `${attachmentTemplateName}.ejs`);
//                 const emailBodyTemplatePath = path.join(__dirname, '/email_templates', `${emailBodyTemplateName}.ejs`);

//                 const [attachmentTemplate, emailBodyTemplate] = await Promise.all([
//                     ejs.renderFile(attachmentTemplatePath, { subject, data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData }),
//                     ejs.renderFile(emailBodyTemplatePath, { subject, data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData })
//                 ]);

//                 const attachmentPdfFilePath = path.join(__dirname, 'carbon_footprint.pdf');

//                 await new Promise((resolve, reject) => {
//                     pdf.create(attachmentTemplate, options).toFile(attachmentPdfFilePath, (err, res) => {
//                         if (err) {
//                             console.log("-------- error in both attachment pdf create ", err);
//                             reject(err);
//                         } else {
//                             mailOptions = {
//                                 from: process.env.GMAIL_FROM,
//                                 to: receiver,
//                                 subject: subject,
//                                 html: emailBodyTemplate,
//                                 attachments: [
//                                     {
//                                         filename: 'carbon_footprint.pdf',
//                                         path: attachmentPdfFilePath,
//                                         contentType: 'application/pdf'
//                                     }
//                                 ]
//                             };
//                             resolve();
//                         }
//                     });
//                 });

//             } else if (attachmentTemplateName) {   // to attach pdf to mail
//                 const attachmentTemplatePath = path.join(__dirname, '/email_templates', `${attachmentTemplateName}.ejs`);
//                 const attachmentTemplate = await ejs.renderFile(attachmentTemplatePath, { data: data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData });

//                 const attachmentPdfFilePath = path.join(__dirname, 'carbon_footprint.pdf');

//                 await new Promise((resolve, reject) => {
//                     pdf.create(attachmentTemplate, options).toFile(attachmentPdfFilePath, (err, res) => {
//                         if (err) {
//                             console.log("-------- error in only attachment pdf create ", err);
//                             reject(err);
//                         } else {
//                             mailOptions = {
//                                 from: process.env.GMAIL_FROM,
//                                 to: receiver,
//                                 subject: subject,
//                                 attachments: [
//                                     {
//                                         filename: 'carbon_footprint.pdf',
//                                         path: attachmentPdfFilePath,
//                                         contentType: 'application/pdf'
//                                     }
//                                 ]
//                             };
//                             resolve();
//                         }
//                     });
//                 });
//             }
//             else {         // template in email body
//                 const bodyTemplatePath = path.join(__dirname, '/email_templates', `${emailBodyTemplateName}.ejs`);
//                 const bodyTemplate = await ejs.renderFile(bodyTemplatePath, { data: data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData });

//                 mailOptions = {
//                     from: process.env.GMAIL_FROM,
//                     to: receiver,
//                     subject: subject,
//                     html: bodyTemplate
//                 };
//             }
//         }

//         // Send email
//         // await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully');

//     } catch (error) {
//         console.log('Error sending email:', error);
//         throw error;
//     }
// };

// export default sendMail;