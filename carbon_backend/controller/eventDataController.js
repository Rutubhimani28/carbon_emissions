import mongoose from 'mongoose';
import EventData from "../models/eventData.js";
import User from "../models/user.js";

const index = async (req, res) => {
    const userId = req.user.userId;
    const query = { createdBy: userId };

    if (Object.keys(req.query).length > 0) {
        Object.assign(query, req.query);
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

            return {
                // ...event.toObject(), // Convert Mongoose Document to plain object
                f2fEventTotalEmission: f2fEventTotalEmission.toFixed(2),
                virtualEventTotalEmission: virtualEventTotalEmission.toFixed(2),
                prEventTotalEmission: prEventTotalEmission.toFixed(2),
                digitalCampaignTotalEmission: digitalCampaignTotalEmission.toFixed(2),
                activityName: event?.activityName,
                budget: event?.budget,
                createdBy: event?.createdBy?.loginId,
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

export default { index, add, edit, getEventsEmissionsRecords };