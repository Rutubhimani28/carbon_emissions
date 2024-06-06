import mongoose from "mongoose";

const airTravel = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    noOfTrips: { type: Number },
    emission: { type: Number },
    ef: { type: Number },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
});

export default mongoose.model('AirTravel', airTravel, 'AirTravel');