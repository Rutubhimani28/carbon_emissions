import mongoose from "mongoose";

const airFreight = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    noOfKms: { type: Number },
    weightInKgs: { type: Number },
    emission: { type: Number },
    ef: { type: Number },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
})

export default mongoose.model('AirFreight', airFreight, 'AirFreight');