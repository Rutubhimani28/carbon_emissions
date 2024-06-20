import sendMail from "../middelwares/sendMail.js";

const add = async (req, res) => {
    try {
        const sendMailPayload = {
            subject: 'feedback or questions',
            message: req.body.message
        };

        await sendMail(sendMailPayload);

        return res.status(201).json({ success: true, message: 'Email Sent successfully' });
    } catch (err) {
        console.error('Failed to send mail:', err);
        res.status(500).json({ error: 'Failed to send mail' });
    }
};

export default { add };