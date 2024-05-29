import eventVenueSchema from "../models/eventVenue.js";
import eventExecutionAgencySchema from "../models/eventExecutionAgency.js";

const eventVenueList = async (req, res) => {
    const query = req.query;

    let allData = await eventVenueSchema.find(query);

    let result = allData.filter((item) => item.createdBy !== null);
    result = result.sort((a, b) => b.createdOn - a.createdOn);

    res.send({ result });
};

const eventExecutionAgencyList = async (req, res) => {
    const query = req.query;

    let allData = await eventExecutionAgencySchema.find(query);

    let result = allData.filter((item) => item.createdBy !== null);
    result = result.sort((a, b) => b.createdOn - a.createdOn);

    res.send({ result });
};

const eventVenue = async (req, res) => {
    try {
        const result = new eventVenueSchema(req.body);
        await result.save();
        res.status(200).json({ result, message: "Data saved successfully" });
    } catch (err) {
        console.error("Failed to create Data:", err);
        res.status(500).json({ error: "Failed to create Data" });
    }
};

const eventExecutionAgency = async (req, res) => {
    try {
        const result = new eventExecutionAgencySchema(req.body);
        await result.save();
        res.status(200).json({ result, message: "Data saved successfully" });
    } catch (err) {
        console.error("Failed to create Data:", err);
        res.status(500).json({ error: "Failed to create Data" });
    }
};

const addMany = async (req, res) => {
    try {
        const data = req.body;
        const result = await eventVenueSchema.insertMany(data);
        res.status(200).json({
            success: true,
            result: result,
            message: "Data imported successfully",
        });
    } catch (err) {
        console.error("Failed to create Data :", err);
        res.status(400).json({
            success: false,
            message: "Failed to create Data",
            error: err.toString(),
        });
    }
};

const eventVenueDeleteMany = async (req, res) => {
    try {
        const ids = req.body;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).send({ message: "Invalid input data" });
        }

        const result = await eventVenueSchema.deleteMany({ _id: { $in: ids } });
        res.status(200).send({ message: "Data deleted successfully", result });
    } catch (error) {
        console.error("Error deleting Data", error);
        res.status(500).send({ message: "Server error", error });
    }
};

const eventExecutionAgencyDeleteMany = async (req, res) => {
    try {
        const ids = req.body;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).send({ message: "Invalid input data" });
        }

        const result = await eventVenueSchema.deleteMany({ _id: { $in: ids } });
        res.status(200).send({ message: "Data deleted successfully", result });
    } catch (error) {
        console.error("Error deleting Data", error);
        res.status(500).send({ message: "Server error", error });
    }
};

export default {
    eventVenueList,
    eventExecutionAgencyList,
    eventVenue,
    eventExecutionAgency,
    addMany,
    eventVenueDeleteMany,
    eventExecutionAgencyDeleteMany,
};
