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