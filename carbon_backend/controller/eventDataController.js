import mongoose from 'mongoose';
import EventData from "../models/eventData.js";
import User from "../models/user.js";
import pdf from "html-pdf";

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
            digitalCampaignAllData
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

        let existingEventData = await EventData.findById({ _id: eventDataId, createdBy: new mongoose.Types.ObjectId(createdBy) });
        if (!existingEventData) {
            return res.status(404).json({ error: 'Event data not found' });
        }

        existingEventData.set(updateData);
        await existingEventData.save();

        res.status(200).json({ success: true, data: existingEventData, message: 'Data updated successfully' });

    } catch (err) {
        console.error('Failed to update event Data:', err);
        res.status(500).json({ error: 'Failed to update event data' });
    }
};

// only for admin
const getEventsEmissionsRecords = async (req, res) => {
    const userId = req.user.userId;

    try {
        // Fetch user details to check role
        const user = await User.findById(userId).select('role');

        if (user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied.' });
        }

        // Fetch the existing event data, sorted by dateTime in descending order, and populate createdBy for loginId
        const existingEventData = await EventData.find()
            .populate('createdBy', 'loginId')
            .sort({ dateTime: -1 });  // Sort by dateTime, newest first

        // Map through existingEventData to calculate emissions
        const eventsWithEmissions = existingEventData.map(event => {

            // Face-to-Face Event Emissions
            const airTravelEmission = event?.airTravelAllData?.totalEmission || 0;
            const localTransportationEmission = event?.localTranspotationAllData?.totalEmission || 0;
            const hotelEmission = event?.hotelAllData?.totalEmission || 0;
            const foodEmission = event?.foodAllData?.totalEmission || 0;
            const airFreightEmission = event?.airFreightAllData?.totalEmission || 0;
            const productionEmission = event?.productionAllData?.totalEmission || 0;
            const energyEmission = event?.energyAllData?.totalEmission || 0;
            const digitalContentEmission = event?.digitalCommsAllData?.totalEmission || 0;
            const wasteEmission = event?.wasteAllData?.totalEmission || 0;

            const f2fEventTotalEmission = Number(airTravelEmission) + Number(localTransportationEmission) +
                Number(hotelEmission) + Number(foodEmission) +
                Number(airFreightEmission) + Number(productionEmission) +
                Number(energyEmission) + Number(digitalContentEmission) +
                Number(wasteEmission);

            // Virtual Event Emissions
            const outboundMarketingEmission = event?.vitrualEventAllData?.totalEmission || 0;
            const virtualEventTotalEmission = Number(outboundMarketingEmission);

            // PR Event Emissions
            const commsEmission = event?.commsAllData?.totalEmission || 0;
            const prAgencyEmission = event?.prAgencyAllData?.totalEmission || 0;
            const hospitalityEmission = event?.hospitalityAllData?.totalEmission || 0;

            const prEventTotalEmission = Number(commsEmission) + Number(prAgencyEmission) + Number(hospitalityEmission);

            // Digital Campaign Emissions
            const digitalCampaignEmission = event?.digitalCampaignAllData?.totalEmission || 0;
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
                _id: event?._id
            };
        });

        // res.status(200).json({ success: true, data: existingEventData, message: 'Event Data retrieved successfully' });
        res.status(200).json({ success: true, data: eventsWithEmissions });

    } catch (err) {
        console.error('Failed to update event Data:', err);
        res.status(500).json({ message: 'Error retrieving events emission data', error: err.toString() });
    }
};

// only for admin
const getUserRecords = async (req, res) => {
    const userId = req.user.userId;

    try {
        // Fetch user details to check role
        const user = await User.findById(userId).select('role');

        if (user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied.' });
        }

        // Fetch the existing event data, sorted by dateTime in descending order, and populate createdBy for loginId
        const existingUserData = await User.find()

        // Map through existingUserData to calculate emissions
        const listOfUsers = existingUserData.map(user => {
            return {
                label: user?.loginId,
                value: user?._id
            };
        });

        res.status(200).json({ success: true, data: listOfUsers });

    } catch (err) {
        console.error('Failed to update event Data:', err);
        res.status(500).json({ message: 'Error retrieving events emission data', error: err.toString() });
    }
};

const dataFind = async (req, res) => {
  const { startDate, endDate } = req.body; // Assuming the dates are provided in the request body

  // Parse the start and end dates to JavaScript Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Define the PDF options before the PDF creation
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

  try {
    // Fetch the event data for the given date range
    const existingEventData = await EventData.find({
      createdAt: { $gte: start, $lte: end },
    });

    // Map through existingEventData to calculate emissions
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

      // Construct the activityType string based on conditions
      let activityTypeArray = [];
      if (
        (f2fEventTotalEmission.toFixed(2) <= 0) &
        (virtualEventTotalEmission.toFixed(2) <= 0) &
        (prEventTotalEmission.toFixed(2) <= 0) &
        (digitalCampaignTotalEmission.toFixed(2) <= 0)
      ) {
        activityTypeArray.push(" - ");
      }
      if (f2fEventTotalEmission.toFixed(2) > 0) {
        activityTypeArray.push("F2F Event");
      }
      if (virtualEventTotalEmission.toFixed(2) > 0) {
        activityTypeArray.push("Outdoor Marketing");
      }
      if (prEventTotalEmission.toFixed(2) > 0) {
        activityTypeArray.push("PR Event");
      }
      if (digitalCampaignTotalEmission.toFixed(2) > 0) {
        activityTypeArray.push("Digital Campaign");
      }

      // Join the activity types with commas and avoid duplicates
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
      .reduce((total, data) => {
        return total + Number(data.carbon);
      }, 0)
      .toFixed(2);

    // Create HTML for PDF
    const html = `
    <html>
        <head>
            <style>
                body {
                    margin: 40px;
                    text-align: center;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    page-break-inside: auto;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f4f4f4;
                }
                thead {
                    display: table-header-group;
                }
                tfoot {
                    display: table-footer-group;
                }
                tr {
                    page-break-inside: avoid;
                }
            </style>
        </head>
        <body>
            <h2>Report from ${startDate} to ${endDate}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Activity Type</th>
                        <th>Activity Name</th>
                        <th>Date</th>
                        <th>Carbon Footprint</th>
                    </tr>
                </thead>
                <tbody>
                    ${pdfData
                      .map(
                        (data) => `
                        <tr>
                            <td>${data.activityType}</td>
                            <td>${data.activityName}</td>
                            <td>${data.date}</td>
                            <td>${data.carbon} tCO2e</td>
                        </tr>
                    `
                      )
                      .join("")}
                    <tr>
                        <td colspan="3" style="text-align: center; font-weight: bold;">Total</td>
                        <td style="font-weight: bold;">${totalCarbonEmissions} tCO2e</td>
                    </tr>
                </tbody>
            </table>
        </body>
    </html>
  `;

    // Generate PDF
    pdf.create(html, pdfOptions).toBuffer((err, buffer) => {
      if (err) {
        console.error("Failed to generate PDF:", err);
        return res
          .status(500)
          .json({ message: "Error generating PDF", error: err.toString() });
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="Event_Emissions_Report.pdf"'
      );
      res.send(buffer);
    });
  } catch (err) {
    console.error("Failed to retrieve or process event data:", err);
    res.status(500).json({
      message: "Error retrieving events emission data",
      error: err.toString(),
    });
  }
};


export default { index, add, edit, getEventsEmissionsRecords, getUserRecords, dataFind };