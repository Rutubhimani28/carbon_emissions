import mongoose from "mongoose";

const localTransportation = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    noOfKms: { type: Number },
    noOfPassengers: { type: Number },
    pkm: { type: Number },
    formula: { type: String },
    emission: { type: Number },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
})

export default mongoose.model('LocalTransportation', localTransportation, 'LocalTransportation');