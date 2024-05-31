import mongoose from "mongoose";

const energy = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    kwh: {
        type: Number,
        default: null
    },
    gallons: {
        type: Number,
        default: null
    },
    // ef: { type: Number },
    // emission: { type: Number },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
});

export default mongoose.model('Energy', energy, 'Energy');