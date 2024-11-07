import mongoose from 'mongoose';

// Define the schema for allDataOfTab
const AllDataOfTabSchema = new mongoose.Schema({
    tabTitle: String,
    tabData: []
}, { _id: false });

const oneTabAllDataSchema = new mongoose.Schema({
    totalEmission: {
        type: Number,
        // required: true,
    },
    // scope: {
    //     type: Number,
    //     required: true,
    // },
    data: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
    },
}, { _id: false });

// Define the schema for the main data
const EventDataSchema = new mongoose.Schema(
    {
        activityName: { type: String, required: true },
        country: { type: String, required: true },
        budget: { type: Number, required: true },
        f2fEventData: [AllDataOfTabSchema],
        prEventData: [AllDataOfTabSchema],
        virtualEventData: [AllDataOfTabSchema],
        digitalCampaignData: [AllDataOfTabSchema],
        airTravelAllData: oneTabAllDataSchema,
        localTranspotationAllData: oneTabAllDataSchema,
        hotelAllData: oneTabAllDataSchema,
        foodAllData: oneTabAllDataSchema,
        airFreightAllData: oneTabAllDataSchema,
        productionAllData: oneTabAllDataSchema,
        energyAllData: oneTabAllDataSchema,
        digitalCommsAllData: oneTabAllDataSchema,
        wasteAllData: oneTabAllDataSchema,
        vitrualEventAllData: oneTabAllDataSchema,
        commsAllData: oneTabAllDataSchema,
        prAgencyAllData: oneTabAllDataSchema,
        hospitalityAllData: oneTabAllDataSchema,
        digitalCampaignAllData: oneTabAllDataSchema,
        dateTime: { type: String, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Assuming 'User' is the name of your user model
    },
    {
        timestamps: true
    },);


// Create a model based on the schema
export default mongoose.model('EventData', EventDataSchema, 'EventData');