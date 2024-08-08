// // Using html-pdf
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
//         await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully');

//     } catch (error) {
//         console.log('Error sending email:', error);
//         throw error;
//     }
// };

// export default sendMail;

// // using puppeteer
// import puppeteer from 'puppeteer';
// import ejs from 'ejs';
// import nodemailer from 'nodemailer';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const options = {
//     format: 'A4',
//     printBackground: true,
//     margin: {
//         top: '1cm',
//         right: '1cm',
//         bottom: '1cm',
//         left: '1cm'
//     },
//     landscape: false
// };
// const sendMail = async ({
//     receiver,
//     subject,
//     data,
//     emailBodyTemplateName,
//     attachmentTemplateName,
//     message,
//     activityName,
//     name,
//     totalTonCo2,
//     eveydolarCo2,
//     mailVerifiLink,
//     resetPswdLink,
//     resultTableData
// }) => {
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
//             if (attachmentTemplateName && emailBodyTemplateName) {

//                 const attachmentTemplatePath = path.join(__dirname, '/email_templates', `${attachmentTemplateName}.ejs`);
//                 const emailBodyTemplatePath = path.join(__dirname, '/email_templates', `${emailBodyTemplateName}.ejs`);

//                 const [attachmentTemplate, emailBodyTemplate] = await Promise.all([
//                     ejs.renderFile(attachmentTemplatePath, { subject, data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData }),
//                     ejs.renderFile(emailBodyTemplatePath, { subject, data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData })
//                 ]);

//                 const pdfFilePath = path.join(__dirname, 'carbon_footprint.pdf');

//                 const browser = await puppeteer.launch();
//                 const page = await browser.newPage();
//                 await page.setContent(attachmentTemplate);
//                 await page.pdf({ ...options, path: pdfFilePath });  // Save PDF locally
//                 await browser.close();

//                 mailOptions = {
//                     from: process.env.GMAIL_FROM,
//                     to: receiver,
//                     subject: subject,
//                     html: emailBodyTemplate,
//                     attachments: [
//                         {
//                             filename: 'carbon_footprint.pdf',
//                             path: pdfFilePath,
//                             contentType: 'application/pdf'
//                         }
//                     ]
//                 };

//             } else if (attachmentTemplateName) {
//                 const attachmentTemplatePath = path.join(__dirname, '/email_templates', `${attachmentTemplateName}.ejs`);
//                 const attachmentTemplate = await ejs.renderFile(attachmentTemplatePath, { data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData });

//                 const pdfFilePath = path.join(__dirname, 'carbon_footprint.pdf');

//                 const browser = await puppeteer.launch();
//                 const page = await browser.newPage();
//                 await page.setContent(attachmentTemplate);
//                 await page.pdf({ ...options, path: pdfFilePath });

//                 mailOptions = {
//                     from: process.env.GMAIL_FROM,
//                     to: receiver,
//                     subject: subject,
//                     attachments: [
//                         {
//                             filename: 'carbon_footprint.pdf',
//                             path: pdfFilePath,
//                             contentType: 'application/pdf'
//                         }
//                     ]
//                 };

//             } else {
//                 const bodyTemplatePath = path.join(__dirname, '/email_templates', `${emailBodyTemplateName}.ejs`);
//                 const bodyTemplate = await ejs.renderFile(bodyTemplatePath, { data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData });

//                 mailOptions = {
//                     from: process.env.GMAIL_FROM,
//                     to: receiver,
//                     subject: subject,
//                     html: bodyTemplate
//                 };
//             }
//         }

//         // Send email
//         await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully');

//         // if (fs.existsSync(pdfFilePath)) {
//         //     fs.unlinkSync(pdfFilePath);  // Remove the file after sending the email
//         // }

//     } catch (error) {
//         console.log('Error sending email:', error);
//         throw error;
//     }
// };

// export default sendMail;


// // using pdf-kit
// import 'dotenv/config';
// import nodemailer from 'nodemailer';
// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import path from 'path';
// import ejs from 'ejs';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Define your PDF options
// const options = {
//     format: 'A4',
//     orientation: 'portrait',
//     border: '1cm',
//     type: 'pdf',
//     quality: '75'
// };

// // Function to create PDF with pdfkit
// const createPDF = (template, outputPath) => {
//     return new Promise((resolve, reject) => {
//         const doc = new PDFDocument({ size: options.format, layout: options.orientation });
//         const stream = fs.createWriteStream(outputPath);
//         doc.pipe(stream);

//         doc.text(template, { align: 'left' });
//         doc.end();

//         stream.on('finish', () => resolve(outputPath));
//         stream.on('error', reject);
//     });
// };

// const sendMail = async ({ receiver, subject, data, emailBodyTemplateName, attachmentTemplateName, message, activityName, name, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData }) => {
//     try {
//         let mailOptions = {};
//         const transporter = nodemailer.createTransport({
//             // host: 'smtpout.secureserver.net',
//             host: 'smtp.office365.com',
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
//             if (attachmentTemplateName && emailBodyTemplateName) {
//                 const attachmentTemplatePath = path.join(__dirname, '/email_templates', `${attachmentTemplateName}.ejs`);
//                 const emailBodyTemplatePath = path.join(__dirname, '/email_templates', `${emailBodyTemplateName}.ejs`);

//                 const [attachmentTemplate, emailBodyTemplate] = await Promise.all([
//                     ejs.renderFile(attachmentTemplatePath, { subject, data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData }),
//                     ejs.renderFile(emailBodyTemplatePath, { subject, data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData })
//                 ]);

//                 const attachmentPdfFilePath = path.join(__dirname, 'carbon_footprint.pdf');

//                 await createPDF(attachmentTemplate, attachmentPdfFilePath);

//                 mailOptions = {
//                     from: process.env.GMAIL_FROM,
//                     to: receiver,
//                     subject: subject,
//                     html: emailBodyTemplate,
//                     attachments: [
//                         {
//                             filename: 'carbon_footprint.pdf',
//                             path: attachmentPdfFilePath,
//                             contentType: 'application/pdf'
//                         }
//                     ]
//                 };

//                 console.log("------------ attachmentTemplate ", attachmentTemplate);

//             } else if (attachmentTemplateName) {
//                 const attachmentTemplatePath = path.join(__dirname, '/email_templates', `${attachmentTemplateName}.ejs`);
//                 const attachmentTemplate = await ejs.renderFile(attachmentTemplatePath, { data: data, name, activityName, totalTonCo2, eveydolarCo2, mailVerifiLink, resetPswdLink, resultTableData });

//                 const attachmentPdfFilePath = path.join(__dirname, 'carbon_footprint.pdf');

//                 await createPDF(attachmentTemplate, attachmentPdfFilePath);

//                 mailOptions = {
//                     from: process.env.GMAIL_FROM,
//                     to: receiver,
//                     subject: subject,
//                     attachments: [
//                         {
//                             filename: 'carbon_footprint.pdf',
//                             path: attachmentPdfFilePath,
//                             contentType: 'application/pdf'
//                         }
//                     ]
//                 };

//             } else {
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


import 'dotenv/config';
import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define PDF options
const pdfOptions = {
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

// Function to create PDF with Puppeteer
const createPDF = async (htmlContent, outputPath) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-software-rasterizer'
        ]
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.pdf({
        path: outputPath,
        ...pdfOptions
    });

    await browser.close();
    return outputPath;
};

const sendMail = async ({
    receiver,
    subject,
    data,
    emailBodyTemplateName,
    attachmentTemplateName,
    attachmentPdfName,
    message,
    activityName,
    name,
    totalTonCo2,
    eveydolarCo2,
    mailVerifiLink,
    resetPswdLink,
    resultTableData,
    chatSuggestion
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
            // if (attachmentTemplateName && emailBodyTemplateName) {
            if (attachmentTemplateName && emailBodyTemplateName && chatSuggestion) {
                const attachmentTemplatePath = path.join(__dirname, '/email_templates', `${attachmentTemplateName}.ejs`);
                const emailBodyTemplatePath = path.join(__dirname, '/email_templates', `${emailBodyTemplateName}.ejs`);


                const [attachmentTemplate, emailBodyTemplate] = await Promise.all([
                    ejs.renderFile(attachmentTemplatePath, {
                        subject,
                        data,
                        name,
                        activityName,
                        totalTonCo2,
                        eveydolarCo2,
                        mailVerifiLink,
                        resetPswdLink,
                        resultTableData
                    }),
                    ejs.renderFile(emailBodyTemplatePath, {
                        subject,
                        data,
                        name,
                        activityName,
                        totalTonCo2,
                        eveydolarCo2,
                        mailVerifiLink,
                        resetPswdLink,
                        resultTableData
                    })
                ]);

                const attachmentPdfFilePath = path.join(__dirname, attachmentPdfName ? `${attachmentPdfName}.pdf` : 'carbon_footprint.pdf');
                const chatPdfFilePath = path.join(__dirname, 'carbon_reduction_suggestions.pdf');

                await createPDF(attachmentTemplate, attachmentPdfFilePath);
                await createPDF(chatSuggestion, chatPdfFilePath);

                mailOptions = {
                    from: process.env.GMAIL_FROM,
                    to: receiver,
                    subject: subject,
                    html: emailBodyTemplate,
                    attachments: [
                        {
                            filename: attachmentPdfName ? `${attachmentPdfName}.pdf` : 'carbon_footprint.pdf',
                            path: attachmentPdfFilePath,
                            contentType: 'application/pdf'
                        },
                        {
                            filename: 'carbon_reduction_suggestions.pdf',
                            path: chatPdfFilePath,
                            contentType: 'application/pdf'
                        },
                    ]
                };

            } else if (attachmentTemplateName) {
                const attachmentTemplatePath = path.join(__dirname, '/email_templates', `${attachmentTemplateName}.ejs`);
                const attachmentTemplate = await ejs.renderFile(attachmentTemplatePath, {
                    data,
                    name,
                    activityName,
                    totalTonCo2,
                    eveydolarCo2,
                    mailVerifiLink,
                    resetPswdLink,
                    resultTableData
                });

                const attachmentPdfFilePath = path.join(__dirname, attachmentPdfName ? `${attachmentPdfName}.pdf` : 'carbon_footprint.pdf');

                await createPDF(attachmentTemplate, attachmentPdfFilePath);

                mailOptions = {
                    from: process.env.GMAIL_FROM,
                    to: receiver,
                    subject: subject,
                    attachments: [
                        {
                            filename: attachmentPdfName ? `${attachmentPdfName}.pdf` : 'carbon_footprint.pdf',
                            path: attachmentPdfFilePath,
                            contentType: 'application/pdf'
                        }
                    ]
                };

            } else {
                const bodyTemplatePath = path.join(__dirname, '/email_templates', `${emailBodyTemplateName}.ejs`);
                const bodyTemplate = await ejs.renderFile(bodyTemplatePath, {
                    data,
                    name,
                    activityName,
                    totalTonCo2,
                    eveydolarCo2,
                    mailVerifiLink,
                    resetPswdLink,
                    resultTableData
                });

                mailOptions = {
                    from: process.env.GMAIL_FROM,
                    to: receiver,
                    subject: subject,
                    html: bodyTemplate
                };
            }
        }

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        // // Clean up the PDF file
        // if (fs.existsSync(pdfFilePath)) {
        //     fs.unlinkSync(pdfFilePath);
        // }

    } catch (error) {
        console.log('Error sending email:', error);
        throw error;
    }
};

export default sendMail;