import mongoose from "mongoose";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import EventData from "../models/eventData.js";
import User from "../models/user.js";
import { sendMailForDateRangeEvents } from "../middelwares/sendMail.js";

const index = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findById(userId).select("role");

  const query = {};

  if (user.role === "admin") {
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
  const sortedUserEventsData = userEventsData.sort(
    (a, b) => b.createdOn - a.createdOn
  );
  res.status(200).json({ data: sortedUserEventsData });
};

const add = async (req, res) => {
  try {
    const {
      activityName,
      budget,
      country,
      dateTime,
      dateTo,
      dateFrom,
      f2fEventData,
      virtualEventData,
      prEventData,
      digitalCampaignData,
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
      imageAllData,
      videoAllData,
      digitalCampaignAllData,
    } = req.body;
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
      dateFrom:dateFrom,
      dateTo :dateTo ,
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
      imageAllData,
      videoAllData,
      digitalCampaignAllData,
      // dateTime: new Date(),
    });

    // Save the document to the database
    const result = await newEventData.save();

    res
      .status(200)
      .json({
        success: true,
        data: result,
        message: "Data saved successfully",
      });
  } catch (error) {
    console.error("Error saving event data:", error);
    res.status(500).json({ error: "Failed to save event data" });
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
      const imageEmission = event?.imageAllData?.totalEmission || 0;
      const videoEmission = event?.videoAllData?.totalEmission || 0;
      // const digitalCampaignEmission =
      //   event?.digitalCampaignAllData?.totalEmission || 0;
      // const digitalCampaignTotalEmission = Number(digitalCampaignEmission);
      const digitalCampaignTotalEmission =  Number(imageEmission) + Number(videoEmission);


      return {
        // ...event.toObject(), // Convert Mongoose Document to plain object
        f2fEventTotalEmission: f2fEventTotalEmission.toFixed(5),
        virtualEventTotalEmission: virtualEventTotalEmission.toFixed(5),
        prEventTotalEmission: prEventTotalEmission.toFixed(5),
        digitalCampaignTotalEmission: digitalCampaignTotalEmission.toFixed(5),
        activityName: event?.activityName,
        budget: event?.budget,
        dateTo : event?.dateTo ,
        dateFrom: event?.dateFrom,
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

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0"); // Ensure 2 digits for day
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

function formatDateTime(input) {
  // Split date and time
  const [datePart, timePart] = input.split(" ");

  // Reorder the date part
  const [year, month, day] = datePart.split("-");
  const formattedDate = `${day}-${month}-${year}`;

  // Combine with time part
  return `${formattedDate}, ${timePart}`;
}

const generateDateReport = async (req, res) => {
  const { startDate, endDate, name, email } = req.body;
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formattedStart = formatDate(startDate);
  const formattedEnd = formatDate(endDate);

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
        f2fEventTotalEmission.toFixed(5) <= 0 &&
        virtualEventTotalEmission.toFixed(5) <= 0 &&
        prEventTotalEmission.toFixed(5) <= 0 &&
        digitalCampaignTotalEmission.toFixed(5) <= 0
      ) {
        activityTypeArray.push(" - ");
      }
      if (f2fEventTotalEmission.toFixed(5) > 0)
        activityTypeArray.push("F2F Event");
      if (virtualEventTotalEmission.toFixed(5) > 0)
        activityTypeArray.push("Ads");
      if (prEventTotalEmission.toFixed(5) > 0)
        activityTypeArray.push("PR Event");
      if (digitalCampaignTotalEmission.toFixed(5) > 0)
        activityTypeArray.push("Digital Campaign");

      const activityType = activityTypeArray.join(", ");

      return {
        activityName: event?.activityName,
        budget: event?.budget,
        createdBy: event?.createdBy?.loginId,
        createdById: event?.createdBy?._id,
        dateTime: event?.dateTime,
         dateTo : event?.dateTo ,
        dateFrom: event?.dateFrom,
        _id: event?._id,
        activityType,
        f2fEventTotalEmission,
        virtualEventTotalEmission,
        prEventTotalEmission,
        digitalCampaignTotalEmission,
      };
    });

    const eventsData = eventsWithEmissions.map((event) => ({
      activityType: event?.activityType,
      activityName: event?.activityName,
      carbon: (
        Number(event?.f2fEventTotalEmission) +
        Number(event?.virtualEventTotalEmission) +
        Number(event?.prEventTotalEmission) +
        Number(event?.digitalCampaignTotalEmission)
      ).toFixed(5),
      date: formatDateTime(event?.dateTime),
    }));

    const totalCarbonEmissions = eventsData
      .reduce((total, data) => total + Number(data.carbon), 0)
      .toFixed(5);

    const html = await ejs.renderFile(
      "middelwares/email_templates/date-report-template.ejs",
      {
        startDate,
        endDate,
        totalCarbonEmissions: totalCarbonEmissions,
        eventsData: eventsData,
        logoBase64: logoBase64,
      }
    );

    const sendMailPayload = {
      eventsData,
      startDate: formattedStart,
      endDate: formattedEnd,
      totalCarbonEmissions,
      name,
      receiver: email,
      subject: `Carbon Emissions Report from ${formattedStart} to ${formattedEnd}`,
    };

    await sendMailForDateRangeEvents(sendMailPayload); // Send email with updated recipient

    return res
      .status(201)
      .json({ success: true, message: "Email Sent successfully!" });
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

