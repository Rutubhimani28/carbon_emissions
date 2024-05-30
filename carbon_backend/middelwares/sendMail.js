import nodemailer from "nodemailer";
import 'dotenv/config';
import path from 'path';
import ejs from 'ejs';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

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

const generatePdf = async (data) => {
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            table {
                width: 50%;
                border-collapse: collapse;
            }
            table, th, td {
                border: 1px solid black;
            }
            th, td {
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>
        <h2>Your Carbon Footprint :</h2>
        <table>
            <tr>
                <th>Production</th>
                <td><%= data.totalProduction %> metric tons of CO2e</td>
            </tr>
            <tr>
                <th>Air Freight</th>
                <td><%= data.totalAirFreight %> metric tons of CO2e</td>
            </tr>
            <tr>
                <th>Food</th>
                <td><%= data.totalFood %> metric tons of CO2e</td>
            </tr>
            <tr>
                <th>Energy Updated</th>
                <td><%= data.totalEnergyUpdated %> metric tons of CO2e</td>
            </tr>
            <tr>
                <th>Travel</th>
                <td><%= data.totalTravel %> metric tons of CO2e</td>
            </tr>
            <tr>
                <th>Digital Content</th>
                <td><%= data.totalDigitalContent %> metric tons of CO2e</td>
            </tr>
            <tr>
                <th>Local Transportation</th>
                <td><%= data.totalLocalTransportation %> metric tons of CO2e</td>
            </tr>
            <tr>
                <th>Accomodation</th>
                <td><%= data.totalAccomodation %> metric tons of CO2e</td>
            </tr>
            <tr>
                <th>Waste</th>
                <td><%= data.totalWaste %> metric tons of CO2e</td>
            </tr>
        </table>
        <h4>Total = <%= data.grandTotal %> metric tons of CO2e</h4>
    </body>
    </html>
    `;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const htmlContent = ejs.render(htmlTemplate, { data });

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    const pdfPath = path.join(__dirname, 'carbon_footprint.pdf');
    fs.writeFileSync(pdfPath, pdfBuffer);

    return pdfPath;
};

const sendMail = async ({ receiver, subject, data, templateName }) => {
    try {
        const templatePath = path.join(__dirname, 'email_templates', `${templateName}.ejs`);
        const template = await ejs.renderFile(templatePath, { data: data });
        const pdfPath = await generatePdf(data);

        const mailOptions = {
            from: process.env.GMAIL_FROM,
            to: receiver,
            subject: subject,
            // html: template,
            attachments: [
                {
                    filename: 'carbon_footprint.pdf',
                    path: pdfPath,
                    contentType: 'application/pdf'
                }
            ]
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.log('Error sending email:', error);
        throw error;
    }
};

export default sendMail;



// import nodemailer from "nodemailer"
// import 'dotenv/config';
// import path from 'path';
// import ejs from 'ejs';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// const __dirname = path.dirname(__filename); // get the name of the directory

// const transporter = nodemailer.createTransport({
//     host: 'smtp.office365.com',
//     // host: 'sandbox.smtp.mailtrap.io',
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASSWORD
//     },
//     tls: { rejectUnauthorized: false }
// });


// const sendMail = async ({ receiver, subject, data, templateName }) => {
//     try {
//         const templatePath = path.join(__dirname, '/email_templates', `${templateName}.ejs`);
//         const template = await ejs.renderFile(templatePath, { data: data });

//         const mailOptions = {
//             from: process.env.GMAIL_FROM,
//             to: receiver,
//             subject: subject,
//             html: template
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent:', info?.response);
//         return info;
//     } catch (error) {
//         console.log('Error sending email:', error);
//         throw error;
//     }
// };

// export default sendMail;