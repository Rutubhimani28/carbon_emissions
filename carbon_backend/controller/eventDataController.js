import mongoose from "mongoose";
import ejs from "ejs";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import EventData from "../models/eventData.js";
import User from "../models/user.js";

const index = async (req, res) => {
  const userId = req.user.userId;
    const user = await User.findById(userId).select('role');

  const query = {};

    if (user.role === 'admin') {
    if (Object.keys(req.query).length > 0) {
      Object.assign(query, req.query);

      // Handle array query parameters like _id[]
      if (req.query._id && Array.isArray(req.query._id)) {
        query._id = { $in: req.query._id }; // Match any of the provided IDs
      }
    }
  } else {
    query.createdBy = userId;

    // Handle any additional query parameters for non-admin users
    if (Object.keys(req.query).length > 0) {
      Object.assign(query, req.query);

      // Handle array query parameters like _id[]
      if (req.query._id && Array.isArray(req.query._id)) {
        query._id = { $in: req.query._id }; // Match any of the provided IDs
      }
    }
  }

  const userEventsData = await EventData.find(query);
    const sortedUserEventsData = userEventsData.sort((a, b) => b.createdOn - a.createdOn);
  res.status(200).json({ data: sortedUserEventsData });
};

const add = async (req, res) => {
  try {
        const { activityName, budget, country, dateTime, f2fEventData, virtualEventData, prEventData, digitalCampaignData, airTravelAllData, localTranspotationAllData, hotelAllData, foodAllData, airFreightAllData, productionAllData, energyAllData, digitalCommsAllData, wasteAllData, vitrualEventAllData, commsAllData, prAgencyAllData, hospitalityAllData, digitalCampaignAllData } = req.body;
    // Create a new document based on the schema
    // const newEventData = new EventData({
    //     from: eventData.from,
    //     allDataOfTab: eventData.allDataOfTab,
    //     dateTime: new Date(), // or eventData.dateTime if provided
    //     createdBy: mongoose.Types.ObjectId(eventData.userId) // assuming userId is a valid ObjectId
    // });
    const newEventData = new EventData({
      activityName: activityName,
      budget: budget,
      country: country,
      dateTime: dateTime,
      createdBy: new mongoose.Types.ObjectId(req.user.userId),
      f2fEventData: f2fEventData,
      prEventData: prEventData,
      virtualEventData: virtualEventData,
      digitalCampaignData: digitalCampaignData,
      airTravelAllData,
      localTranspotationAllData,
      hotelAllData,
      foodAllData,
      airFreightAllData,
      productionAllData,
      energyAllData,
      digitalCommsAllData,
      wasteAllData,
      vitrualEventAllData,
      commsAllData,
      prAgencyAllData,
      hospitalityAllData,
      digitalCampaignAllData,
      // dateTime: new Date(),
    });

    // Save the document to the database
    const result = await newEventData.save();

        res.status(200).json({ success: true, data: result, message: 'Data saved successfully' });

  } catch (error) {
      console.error('Error saving event data:', error);
      res.status(500).json({ error: 'Failed to save event data' });
  }
};

const edit = async (req, res) => {
  try {
    const eventDataId = req.params.id;
    const { createdBy, ...updateData } = req.body;
    // const { activityName, budget, country, dateTime, f2fEventData, virtualEventData, prEventData, digitalCampaignData, createdBy, eventDataId } = req.body;

    let existingEventData = await EventData.findById({
      _id: eventDataId,
      createdBy: new mongoose.Types.ObjectId(createdBy),
    });
    if (!existingEventData) {
      return res.status(404).json({ error: "Event data not found" });
    }

    existingEventData.set(updateData);
    await existingEventData.save();

    res.status(200).json({
      success: true,
      data: existingEventData,
      message: "Data updated successfully",
    });
  } catch (err) {
    console.error("Failed to update event Data:", err);
    res.status(500).json({ error: "Failed to update event data" });
  }
};

// only for admin
const getEventsEmissionsRecords = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Fetch user details to check role
    const user = await User.findById(userId).select("role");

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied." });
    }

    // Fetch the existing event data, sorted by dateTime in descending order, and populate createdBy for loginId
    const existingEventData = await EventData.find()
      .populate("createdBy", "loginId")
      .sort({ dateTime: -1 }); // Sort by dateTime, newest first

    // Map through existingEventData to calculate emissions
    const eventsWithEmissions = existingEventData.map((event) => {
      // Face-to-Face Event Emissions
      const airTravelEmission = event?.airTravelAllData?.totalEmission || 0;
      const localTransportationEmission =
        event?.localTranspotationAllData?.totalEmission || 0;
      const hotelEmission = event?.hotelAllData?.totalEmission || 0;
      const foodEmission = event?.foodAllData?.totalEmission || 0;
      const airFreightEmission = event?.airFreightAllData?.totalEmission || 0;
      const productionEmission = event?.productionAllData?.totalEmission || 0;
      const energyEmission = event?.energyAllData?.totalEmission || 0;
      const digitalContentEmission =
        event?.digitalCommsAllData?.totalEmission || 0;
      const wasteEmission = event?.wasteAllData?.totalEmission || 0;

      const f2fEventTotalEmission =
        Number(airTravelEmission) +
        Number(localTransportationEmission) +
        Number(hotelEmission) +
        Number(foodEmission) +
        Number(airFreightEmission) +
        Number(productionEmission) +
        Number(energyEmission) +
        Number(digitalContentEmission) +
        Number(wasteEmission);

      // Virtual Event Emissions
      const outboundMarketingEmission =
        event?.vitrualEventAllData?.totalEmission || 0;
      const virtualEventTotalEmission = Number(outboundMarketingEmission);

      // PR Event Emissions
      const commsEmission = event?.commsAllData?.totalEmission || 0;
      const prAgencyEmission = event?.prAgencyAllData?.totalEmission || 0;
      const hospitalityEmission = event?.hospitalityAllData?.totalEmission || 0;

      const prEventTotalEmission =
        Number(commsEmission) +
        Number(prAgencyEmission) +
        Number(hospitalityEmission);

      // Digital Campaign Emissions
      const digitalCampaignEmission =
        event?.digitalCampaignAllData?.totalEmission || 0;
      const digitalCampaignTotalEmission = Number(digitalCampaignEmission);

      // console.log("=== createdBy ", event?.createdBy);

      return {
        // ...event.toObject(), // Convert Mongoose Document to plain object
        f2fEventTotalEmission: f2fEventTotalEmission.toFixed(2),
        virtualEventTotalEmission: virtualEventTotalEmission.toFixed(2),
        prEventTotalEmission: prEventTotalEmission.toFixed(2),
        digitalCampaignTotalEmission: digitalCampaignTotalEmission.toFixed(2),
        activityName: event?.activityName,
        budget: event?.budget,
        createdBy: event?.createdBy?.loginId,
        createdById: event?.createdBy?._id,
        dateTime: event?.dateTime,
        _id: event?._id,
      };
    });

    // res.status(200).json({ success: true, data: existingEventData, message: 'Event Data retrieved successfully' });
    res.status(200).json({ success: true, data: eventsWithEmissions });
  } catch (err) {
    console.error("Failed to update event Data:", err);
    res.status(500).json({
      message: "Error retrieving events emission data",
      error: err.toString(),
    });
  }
};

// only for admin
const getUserRecords = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Fetch user details to check role
    const user = await User.findById(userId).select("role");

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied." });
    }

    // Fetch the existing event data, sorted by dateTime in descending order, and populate createdBy for loginId
    const existingUserData = await User.find();

    // Map through existingUserData to calculate emissions
    const listOfUsers = existingUserData.map((user) => {
      return {
        label: user?.loginId,
        value: user?._id,
      };
    });

    res.status(200).json({ success: true, data: listOfUsers });
  } catch (err) {
    console.error("Failed to update event Data:", err);
    res.status(500).json({
      message: "Error retrieving events emission data",
      error: err.toString(),
    });
  }
};

const generateDateReport = async (req, res) => {
  const { startDate, endDate } = req.body;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const pdfOptions = {
    format: "A4",
    printBackground: true,
    margin: {
      top: "2cm",
      right: "1cm",
      bottom: "1cm",
      left: "1cm",
    },
    landscape: false,
  };

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const logoPath = path.join(
    __dirname,
    "..",
    "middelwares",
    "email_templates",
    "logo.png"
  );

  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = logoBuffer.toString("base64");

  try {
    const existingEventData = await EventData.find({
      createdAt: { $gte: start, $lte: end },
    });

    const eventsWithEmissions = existingEventData.map((event) => {
      const airTravelEmission = event?.airTravelAllData?.totalEmission || 0;
      const localTransportationEmission =
        event?.localTranspotationAllData?.totalEmission || 0;
      const hotelEmission = event?.hotelAllData?.totalEmission || 0;
      const foodEmission = event?.foodAllData?.totalEmission || 0;
      const airFreightEmission = event?.airFreightAllData?.totalEmission || 0;
      const productionEmission = event?.productionAllData?.totalEmission || 0;
      const energyEmission = event?.energyAllData?.totalEmission || 0;
      const digitalContentEmission =
        event?.digitalCommsAllData?.totalEmission || 0;
      const wasteEmission = event?.wasteAllData?.totalEmission || 0;

      const f2fEventTotalEmission =
        Number(airTravelEmission) +
        Number(localTransportationEmission) +
        Number(hotelEmission) +
        Number(foodEmission) +
        Number(airFreightEmission) +
        Number(productionEmission) +
        Number(energyEmission) +
        Number(digitalContentEmission) +
        Number(wasteEmission);

      const outboundMarketingEmission =
        event?.vitrualEventAllData?.totalEmission || 0;
      const virtualEventTotalEmission = Number(outboundMarketingEmission);

      const commsEmission = event?.commsAllData?.totalEmission || 0;
      const prAgencyEmission = event?.prAgencyAllData?.totalEmission || 0;
      const hospitalityEmission = event?.hospitalityAllData?.totalEmission || 0;

      const prEventTotalEmission =
        Number(commsEmission) +
        Number(prAgencyEmission) +
        Number(hospitalityEmission);

      const digitalCampaignEmission =
        event?.digitalCampaignAllData?.totalEmission || 0;
      const digitalCampaignTotalEmission = Number(digitalCampaignEmission);

      let activityTypeArray = [];
      if (
        f2fEventTotalEmission.toFixed(2) <= 0 &&
        virtualEventTotalEmission.toFixed(2) <= 0 &&
        prEventTotalEmission.toFixed(2) <= 0 &&
        digitalCampaignTotalEmission.toFixed(2) <= 0
      ) {
        activityTypeArray.push(" - ");
      }
      if (f2fEventTotalEmission.toFixed(2) > 0)
        activityTypeArray.push("F2F Event");
      if (virtualEventTotalEmission.toFixed(2) > 0)
        activityTypeArray.push("Outdoor Marketing");
      if (prEventTotalEmission.toFixed(2) > 0)
        activityTypeArray.push("PR Event");
      if (digitalCampaignTotalEmission.toFixed(2) > 0)
        activityTypeArray.push("Digital Campaign");

      const activityType = activityTypeArray.join(", ");

      return {
        activityName: event?.activityName,
        budget: event?.budget,
        createdBy: event?.createdBy?.loginId,
        createdById: event?.createdBy?._id,
        dateTime: event?.dateTime,
        _id: event?._id,
        activityType,
        f2fEventTotalEmission,
        virtualEventTotalEmission,
        prEventTotalEmission,
        digitalCampaignTotalEmission,
      };
    });

    const pdfData = eventsWithEmissions.map((event) => ({
      activityType: event.activityType,
      activityName: event.activityName,
      carbon: (
        Number(event.f2fEventTotalEmission) +
        Number(event.virtualEventTotalEmission) +
        Number(event.prEventTotalEmission) +
        Number(event.digitalCampaignTotalEmission)
      ).toFixed(2),
      date: event.dateTime,
    }));

    const totalCarbonEmissions = pdfData
      .reduce((total, data) => total + Number(data.carbon), 0)
      .toFixed(2);

    const html = await ejs.renderFile(
      "middelwares/email_templates/date-report-template.ejs",
      {
        startDate,
        endDate,
        pdfData: pdfData,
        totalCarbonEmissions: totalCarbonEmissions,
        logoBase64: logoBase64,
      }
    );

    const createPDF = async (htmlContent, outputPath) => {
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
          "--disable-software-rasterizer",
          "--single-process",
          "--no-zygote",
        ],
      });

      const page = await browser.newPage();
      await page.setContent(htmlContent, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });

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
        displayHeaderFooter: true,
        headerTemplate,
        footerTemplate,
      });

      await browser.close();
      return outputPath;
    };

    // const outputPath = "carbon_footprint_chart";
    const outputPath = "Carbon_Emission_Report";
    const attachmentPdfFilePath = path.join(__dirname, `${outputPath}.pdf`);
    await createPDF(html, attachmentPdfFilePath);

    // Send the PDF file in the response
    res.download(attachmentPdfFilePath, `Carbon_Emission_Report_${start}_to_${end}.pdf`, (err) => {
      if (err) {
        console.error("Error sending the PDF file:", err);
        res.status(500).send("Failed to send the PDF file.");
      } else {
        // Optionally delete the file after sending
        fs.unlinkSync(attachmentPdfFilePath);
      }
    });
  } catch (err) {
    console.error("Failed to retrieve or process event data:", err);
    res.status(500).json({
      message: "Error retrieving events emission data",
      error: err.toString(),
    });
  }
};


export default {
  index,
  add,
  edit,
  getEventsEmissionsRecords,
  getUserRecords,
  generateDateReport,
};
