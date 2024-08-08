import sendMail from '../middelwares/sendMail.js';
import Email from '../models/email.js';

const addEmail = async (req, res) => {
    try {
        // const { subject, receiver, sender, data, templateName, activityName, name, totalTonCo2, eveydolarCo2, resultTableData } = req.body;
        const { subject, receiver, sender, data, emailBodyTemplateName, attachmentTemplateName, attachmentPdfName, activityName, name, totalTonCo2, eveydolarCo2, resultTableData, chatSuggestion} = req.body;

        if (!receiver || receiver?.length < 1) {
            return res.status(400).json({ success: false, message: 'Receiver is required' });
        }

        const sendMailPayload = {
            receiver: receiver,
            subject: subject,
            data: { ...data },
            // templateName: templateName,
            emailBodyTemplateName: emailBodyTemplateName,
            attachmentTemplateName: attachmentTemplateName,
            attachmentPdfName: attachmentPdfName,
            activityName: activityName,
            name: name,       // client entered name
            eveydolarCo2,
            totalTonCo2,
            resultTableData,
            chatSuggestion
        };
        await sendMail(sendMailPayload);

        const newEmail = new Email({ subject, receiver, sender, emailBodyTemplateName: emailBodyTemplateName || '', attachmentTemplateName: attachmentTemplateName || '', data: data });
        await newEmail.save();

        return res.status(201).json({ success: true, message: 'Email Sent successfully' });

    } catch (error) {
        console.error('SendMail catch error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export default { addEmail };