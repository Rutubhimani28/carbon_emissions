import 'dotenv/config';
import nodemailer from 'nodemailer';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
// import { dirname } from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the image file and convert it to Base64
const logoPath = path.join(__dirname, 'email_templates', 'logo.png');
const logoBase64 = fs.readFileSync(logoPath, 'base64');

// Define PDF options
const pdfOptions = {
    format: 'A4',
    printBackground: true,
    margin: {
        top: '2cm',
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

    // Define the header template with the logo in the top-right corner
    const headerTemplate = `
        <div style="width: 100%; text-align: right; padding-right: 20px;">
            <img src="data:image/png;base64,${logoBase64}" style="width: 100px; height: auto; max-height: 50px;" alt="Sirat-Logo"/>
        </div>
    `;

    const footerTemplate = `
        <div style="font-size: 10px; text-align: center; width: 100%;">
            <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>
    `;

    await page.pdf({
        path: outputPath,
        ...pdfOptions,
        displayHeaderFooter: true, // Enable header and footer
        headerTemplate: headerTemplate, // Add custom header
        footerTemplate
    });

    await browser.close();
    return outputPath;
};

export default async function sendMail({
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
    chatSuggestion,
    isHighPriority,
    // below for retrieve and send all events filled fields data
    totalTonCo2One,
    totalTonCo2Two,
    totalTonCo2Three,
    totalTonCo2Four,
    eveydolarCo2One,
    eveydolarCo2Two,
    eveydolarCo2Three,
    eveydolarCo2Four,
    resultTableDataOne,
    resultTableDataTwo,
    resultTableDataThree,
    resultTableDataFour,
    attachmentTemplateNameOne,
    attachmentPdfNameOne,
    attachmentTemplateNameTwo,
    attachmentPdfNameTwo,
    attachmentTemplateNameThree,
    attachmentPdfNameThree,
    attachmentTemplateNameFour,
    attachmentPdfNameFour,
    dataOne,
    dataTwo,
    dataThree,
    dataFour,
    // for graph chart
    allEventsEmissions
}) {
    try {
        let mailOptions = {
            bcc: process.env.GMAIL_FROM
        };
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

        if (message) {             // for bot, buy credits
            mailOptions = {
                from: process.env.GMAIL_FROM,
                to: process.env.GMAIL_FROM,
                subject: subject,
                text: message,
            };

            if (isHighPriority) {   // for bot
                mailOptions.priority = 'high';
                mailOptions.headers = {
                    'X-Priority': '1 (Highest)',
                    'X-MSMail-Priority': 'High',
                    'Importance': 'High'
                };
            }
        }
        else {

            if (allEventsEmissions) {    // for graph (Retrieve Data tab)
                // // Puppeteer only renders static HTML content, and it won’t execute JavaScript for chart generation.
                // const attachmentsArray = [];
                // const attachmentTemplatePath = path.join(__dirname, '/email_templates', `${attachmentTemplateName}.ejs`);

                // const attachmentTemplate = await ejs.renderFile(attachmentTemplatePath, {
                //     subject,
                //     allEventsEmissions: allEventsEmissions,
                //     name,
                //     activityName
                // });

                // const attachmentPdfFilePath = path.join(__dirname, attachmentPdfName ? `${attachmentPdfName}.pdf` : 'carbon_footprint_chart.pdf');
                // await createPDF(attachmentTemplate, attachmentPdfFilePath);

                // attachmentsArray.push(
                //     {
                //         filename: attachmentPdfName ? `${attachmentPdfName}.pdf` : 'carbon_footprint.pdf',
                //         path: attachmentPdfFilePath,
                //         contentType: 'application/pdf'
                //     }
                // );

                // mailOptions = {
                //     from: process.env.GMAIL_FROM,
                //     to: receiver,
                //     subject: subject,
                //     // html: emailBodyTemplate,
                //     attachments: attachmentsArray
                // };

                // Puppeteer only renders static HTML content, and it won’t execute JavaScript for chart generation.
                const attachmentsArray = [];
                const attachmentTemplatePath = path.join(__dirname, '/email_templates', `${attachmentTemplateName}.ejs`);
                const emailBodyTemplatePath = path.join(__dirname, '/email_templates', `${emailBodyTemplateName}.ejs`)

                const [attachmentTemplate, emailBodyTemplate] = await Promise.all([
                    ejs.renderFile(attachmentTemplatePath, {
                        subject,
                        allEventsEmissions: allEventsEmissions,
                        name,
                        activityName
                    }),
                    ejs.renderFile(emailBodyTemplatePath, {
                        name,
                    })
                ]);

                const attachmentPdfFilePath = path.join(__dirname, attachmentPdfName ? `${attachmentPdfName}.pdf` : 'carbon_footprint_chart.pdf');
                await createPDF(attachmentTemplate, attachmentPdfFilePath);

                attachmentsArray.push(
                    {
                        filename: attachmentPdfName ? `${attachmentPdfName}.pdf` : 'carbon_footprint.pdf',
                        path: attachmentPdfFilePath,
                        contentType: 'application/pdf'
                    }
                );

                mailOptions = {
                    from: process.env.GMAIL_FROM,
                    to: receiver,
                    subject: subject,
                    html: emailBodyTemplate,
                    attachments: attachmentsArray
                };
            }
            else if (attachmentTemplateNameOne && attachmentPdfNameOne || attachmentTemplateNameTwo && attachmentPdfNameTwo || attachmentTemplateNameThree && attachmentPdfNameThree || attachmentTemplateNameFour && attachmentPdfNameFour) {  // for events filled fields data - Retrieve Data(Home page)
                const isf2fEvent = attachmentTemplateNameOne ? true : false;
                const isVirtualEvent = attachmentTemplateNameTwo ? true : false;
                const isPrEvent = attachmentTemplateNameThree ? true : false;
                const isDigitalcampaign = attachmentTemplateNameFour ? true : false;

                const emailBodyTemplatePath = path.join(__dirname, '/email_templates', `${emailBodyTemplateName}.ejs`)

                const emailBodyTemplate = await ejs.renderFile(emailBodyTemplatePath, {
                    name,
                });

                const attachmentsArray = [];

                if (isf2fEvent) {
                    const attachmentTemplatePathOne = path.join(__dirname, '/email_templates', `${attachmentTemplateNameOne}.ejs`);
                    const attachmentTemplateOne = await ejs.renderFile(attachmentTemplatePathOne, {
                        subject,
                        data: dataOne,
                        name,
                        activityName,
                        totalTonCo2: totalTonCo2One,
                        eveydolarCo2: eveydolarCo2One,
                        resultTableData: resultTableDataOne,
                    });

                    const attachmentPdfFilePathOne = path.join(__dirname, attachmentPdfNameOne ? `${attachmentPdfNameOne}.pdf` : 'carbon_footprint.pdf');

                    await createPDF(attachmentTemplateOne, attachmentPdfFilePathOne);

                    attachmentsArray.push(
                        {
                            filename: attachmentPdfNameOne ? `${attachmentPdfNameOne}.pdf` : 'carbon_footprint.pdf',
                            path: attachmentPdfFilePathOne,
                            contentType: 'application/pdf'
                        }
                    );

                    // const chatPdfFilePath = path.join(__dirname, 'carbon_reduction_suggestions.pdf');
                    // await createPDF(chatSuggestion, chatPdfFilePath);
                }

                if (isVirtualEvent) {
                    const attachmentTemplatePathTwo = path.join(__dirname, '/email_templates', `${attachmentTemplateNameTwo}.ejs`);
                    const attachmentTemplateTwo = await ejs.renderFile(attachmentTemplatePathTwo, {
                        subject,
                        data: dataTwo,
                        name,
                        activityName,
                        totalTonCo2: totalTonCo2Two,
                        eveydolarCo2: eveydolarCo2Two,
                        resultTableData: resultTableDataTwo,
                    });

                    const attachmentPdfFilePathTwo = path.join(__dirname, attachmentPdfNameTwo ? `${attachmentPdfNameTwo}.pdf` : 'carbon_footprint.pdf');

                    await createPDF(attachmentTemplateTwo, attachmentPdfFilePathTwo);

                    attachmentsArray.push(
                        {
                            filename: attachmentPdfNameTwo ? `${attachmentPdfNameTwo}.pdf` : 'carbon_footprint.pdf',
                            path: attachmentPdfFilePathTwo,
                            contentType: 'application/pdf'
                        }
                    );

                    // const chatPdfFilePath = path.join(__dirname, 'carbon_reduction_suggestions.pdf');
                    // await createPDF(chatSuggestion, chatPdfFilePath);
                }

                if (isPrEvent) {
                    const attachmentTemplatePathThree = path.join(__dirname, '/email_templates', `${attachmentTemplateNameThree}.ejs`);
                    const attachmentTemplateThree = await ejs.renderFile(attachmentTemplatePathThree, {
                        subject,
                        data: dataThree,
                        name,
                        activityName,
                        totalTonCo2: totalTonCo2Three,
                        eveydolarCo2: eveydolarCo2Three,
                        resultTableData: resultTableDataThree,
                    });

                    const attachmentPdfFilePathThree = path.join(__dirname, attachmentPdfNameThree ? `${attachmentPdfNameThree}.pdf` : 'carbon_footprint.pdf');

                    await createPDF(attachmentTemplateThree, attachmentPdfFilePathThree);

                    attachmentsArray.push(
                        {
                            filename: attachmentPdfNameThree ? `${attachmentPdfNameThree}.pdf` : 'carbon_footprint.pdf',
                            path: attachmentPdfFilePathThree,
                            contentType: 'application/pdf'
                        }
                    );

                    // const chatPdfFilePath = path.join(__dirname, 'carbon_reduction_suggestions.pdf');
                    // await createPDF(chatSuggestion, chatPdfFilePath);
                }

                if (isDigitalcampaign) {
                    const attachmentTemplatePathFour = path.join(__dirname, '/email_templates', `${attachmentTemplateNameFour}.ejs`);
                    const attachmentTemplateFour = await ejs.renderFile(attachmentTemplatePathFour, {
                        subject,
                        data: dataFour,
                        name,
                        activityName,
                        totalTonCo2: totalTonCo2Four,
                        eveydolarCo2: eveydolarCo2Four,
                        resultTableData: resultTableDataFour,
                    });

                    const attachmentPdfFilePathFour = path.join(__dirname, attachmentPdfNameFour ? `${attachmentPdfNameFour}.pdf` : 'carbon_footprint.pdf');

                    await createPDF(attachmentTemplateFour, attachmentPdfFilePathFour);

                    attachmentsArray.push(
                        {
                            filename: attachmentPdfNameFour ? `${attachmentPdfNameFour}.pdf` : 'carbon_footprint.pdf',
                            path: attachmentPdfFilePathFour,
                            contentType: 'application/pdf'
                        }
                    );

                    // const chatPdfFilePath = path.join(__dirname, 'carbon_reduction_suggestions.pdf');
                    // await createPDF(chatSuggestion, chatPdfFilePath);
                }

                mailOptions = {
                    from: process.env.GMAIL_FROM,
                    to: receiver,
                    subject: subject,
                    html: emailBodyTemplate,          // added
                    attachments: attachmentsArray
                };
            }

            else if (attachmentTemplateName && emailBodyTemplateName && chatSuggestion) {  // for summary tab. chat + filled field data.  // else if (attachmentTemplateName && emailBodyTemplateName) {
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
                const chatPdfFilePath = path.join(__dirname, 'GenAI Recommendations.pdf');

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

            }

            else if (attachmentTemplateName) {
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
            }

            else {     // for register/signup - email verification + forgot_password
                const bodyTemplatePath = path.join(__dirname, '/email_templates', `${emailBodyTemplateName}.ejs`);
                const bodyTemplate = await ejs.renderFile(bodyTemplatePath, {
                    data,
                    name,
                    activityName,
                    totalTonCo2,
                    eveydolarCo2,
                    mailVerifiLink,
                    resetPswdLink,
                    resultTableData,
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

export const sendMailForTwoEvents = async ({ eventsData }) => {       // for two events filled calculation datas 
    try {
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

        const attachmentsArray = [];

        const combinedData = {};

        // Combine data from both events
        for (const event of eventsData) {
            const {
                receiver,
                subject,
                dataOne,
                totalTonCo2One,
                eveydolarCo2One,
                resultTableDataOne,
                attachmentTemplateNameOne,
                attachmentPdfNameOne,
                dataTwo,
                totalTonCo2Two,
                eveydolarCo2Two,
                resultTableDataTwo,
                attachmentTemplateNameTwo,
                attachmentPdfNameTwo,
                name,
                activityName,
            } = event;

            // Append data to combinedData
            combinedData.dataOne = dataOne;
            combinedData.totalTonCo2One = totalTonCo2One;
            combinedData.eveydolarCo2One = eveydolarCo2One;
            combinedData.resultTableDataOne = resultTableDataOne;

            combinedData.dataTwo = dataTwo;
            combinedData.totalTonCo2Two = totalTonCo2Two;
            combinedData.eveydolarCo2Two = eveydolarCo2Two;
            combinedData.resultTableDataTwo = resultTableDataTwo;

            combinedData.name = name;
            combinedData.activityName = activityName;

            // Handle attachments
            const templatePaths = [
                { templateName: attachmentTemplateNameOne, pdfName: attachmentPdfNameOne, data: dataOne, totalTonCo2: totalTonCo2One, eveydolarCo2: eveydolarCo2One, resultTableData: resultTableDataOne },
                { templateName: attachmentTemplateNameTwo, pdfName: attachmentPdfNameTwo, data: dataTwo, totalTonCo2: totalTonCo2Two, eveydolarCo2: eveydolarCo2Two, resultTableData: resultTableDataTwo },
            ];

            for (const { templateName, pdfName, data, totalTonCo2, eveydolarCo2, resultTableData } of templatePaths) {
                if (templateName) {
                    const templatePath = path.join(__dirname, '/email_templates', `${templateName}.ejs`);
                    const renderedTemplate = await ejs.renderFile(templatePath, {
                        subject,
                        data,
                        name,
                        activityName,
                        totalTonCo2,
                        eveydolarCo2,
                        resultTableData,
                    });

                    const pdfFilePath = path.join(__dirname, pdfName ? `${pdfName}.pdf` : 'carbon_footprint.pdf');
                    await createPDF(renderedTemplate, pdfFilePath);

                    attachmentsArray.push({
                        filename: pdfName ? `${pdfName}.pdf` : 'carbon_footprint.pdf',
                        path: pdfFilePath,
                        contentType: 'application/pdf',
                    });
                }
            }
        }

        // Construct mail options for the combined events
        const mailOptions = {
            bcc: process.env.GMAIL_FROM,
            from: process.env.GMAIL_FROM,
            to: eventsData[0].receiver,     // Assuming the receiver is the same for all events
            subject: eventsData[0].subject, // Assuming the subject is the same for all events
            attachments: attachmentsArray,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully from sendMailForTwoEvents');

    } catch (error) {
        console.log('Error sending email from sendMailForTwoEvents :', error);
        throw error;
    }
};
