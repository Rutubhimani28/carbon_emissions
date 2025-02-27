import sendMail, { sendMailForTwoEvents } from "../middelwares/sendMail.js";
// import Email from '../models/email.js';

// const addEmail = async (req, res) => {
//     try {
//         // const { subject, receiver, sender, data, templateName, activityName, name, totalTonCo2, eveydolarCo2, resultTableData } = req.body;
//         const { subject, receiver, sender, data, emailBodyTemplateName, attachmentTemplateName, attachmentPdfName, activityName, name, totalTonCo2, eveydolarCo2, resultTableData, chatSuggestion} = req.body;

//         if (!receiver || receiver?.length < 1) {
//             return res.status(400).json({ success: false, message: 'Receiver is required' });
//         }

//         const sendMailPayload = {
//             receiver: receiver,
//             subject: subject,
//             data: { ...data },
//             // templateName: templateName,
//             emailBodyTemplateName: emailBodyTemplateName,
//             attachmentTemplateName: attachmentTemplateName,
//             attachmentPdfName: attachmentPdfName,
//             activityName: activityName,
//             name: name,       // client entered name
//             eveydolarCo2,
//             totalTonCo2,
//             resultTableData,
//             chatSuggestion
//         };
//         await sendMail(sendMailPayload);

//         const newEmail = new Email({ subject, receiver, sender, emailBodyTemplateName: emailBodyTemplateName || '', attachmentTemplateName: attachmentTemplateName || '', data: data });
//         await newEmail.save();

//         return res.status(201).json({ success: true, message: 'Email Sent successfully' });

//     } catch (error) {
//         console.error('SendMail catch error:', error);
//         return res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };

const addEmail = async (req, res) => {
  try {
    // const { subject, receiver, sender, data, templateName, activityName, name, totalTonCo2, eveydolarCo2, resultTableData } = req.body;
    const {
      subject,
      receiver,
      data,
      emailBodyTemplateName,
      attachmentTemplateName,
      attachmentPdfName,
      activityName,
      name,
      totalTonCo2,
      eveydolarCo2,
      resultTableData,
      chatSuggestion,
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
    } = req.body;

    if (!receiver || receiver?.length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Receiver is required" });
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
      name: name, // client entered name
      eveydolarCo2,
      totalTonCo2,
      resultTableData,
      chatSuggestion,
      attachmentTemplateNameOne: attachmentTemplateNameOne,
      attachmentPdfNameOne: attachmentPdfNameOne,
      attachmentTemplateNameTwo: attachmentTemplateNameTwo,
      attachmentPdfNameTwo: attachmentPdfNameTwo,
      attachmentTemplateNameThree: attachmentTemplateNameThree,
      attachmentPdfNameThree: attachmentPdfNameThree,
      attachmentTemplateNameFour: attachmentTemplateNameFour,
      attachmentPdfNameFour: attachmentPdfNameFour,
      dataOne: dataOne,
      dataTwo: dataTwo,
      dataThree: dataThree,
      dataFour: dataFour,
      eveydolarCo2One,
      eveydolarCo2Two,
      eveydolarCo2Three,
      eveydolarCo2Four,
      totalTonCo2One,
      totalTonCo2Two,
      totalTonCo2Three,
      totalTonCo2Four,
      resultTableDataOne,
      resultTableDataTwo,
      resultTableDataThree,
      resultTableDataFour,
    };
    await sendMail(sendMailPayload);

    // const newEmail = new Email({ subject, receiver, sender, emailBodyTemplateName: emailBodyTemplateName || '', attachmentTemplateName: attachmentTemplateName || '', data: data });
    // await newEmail.save();

    return res
      .status(201)
      .json({ success: true, message: "Email Sent successfully" });
  } catch (error) {
    console.error("SendMail catch error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const addEmailForGraphs = async (req, res) => {
  try {
    const {
      allEventsEmissions,
      receiver,
      attachmentPdfName,
      attachmentTemplateName,
      subject,
      name,
      activityName,
      emailBodyTemplateName,
    } = req.body;

    if (!receiver || receiver?.length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Receiver is required" });
    }

    const sendMailPayload = {
      receiver: receiver,
      allEventsEmissions,
      attachmentPdfName,
      attachmentTemplateName,
      subject,
      name,
      activityName,
      emailBodyTemplateName,
    };

    await sendMail(sendMailPayload);

    return res
      .status(201)
      .json({ success: true, message: "Email Sent successfully" });
  } catch (error) {
    console.error("SendMail catch error from:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const addEmailForTwoEvents = async (req, res) => {
  try {
    const { eventsData } = req.body;

    if (!eventsData || eventsData?.length < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Needed two events data." });
    }

    const sendMailPayload = {
      eventsData,
    };
    await sendMailForTwoEvents(sendMailPayload);

    // // const newEmail = new Email({ subject, receiver, sender, emailBodyTemplateName: emailBodyTemplateName || '', attachmentTemplateName: attachmentTemplateName || '', data: data });
    // // await newEmail.save();

    return res
      .status(201)
      .json({ success: true, message: "Email Sent successfully" });
  } catch (error) {
    console.error("SendMail catch error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const addEmailPlan = async (req, res) => {
  try {
    const { message, subject } = req.body;

    const sendMailPayload = {
      message,
      subject,
    };
    await sendMail(sendMailPayload);

    return res
      .status(200)
      .json({ success: true, message: "Email Sent successfully" });
  } catch (error) {
    console.error("SendMail catch error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export default {
  addEmail,
  addEmailForGraphs,
  addEmailForTwoEvents,
  addEmailPlan,
};
