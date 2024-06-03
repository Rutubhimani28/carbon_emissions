import mongoose from "mongoose";

const waste = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    subType: {            // for Plastic Water bottle, Branding
        type: String,
        default: null
    },
    kg: {
        type: Number,
        default: null
    },
    litres: {
        type: Number,
        default: null
    },
    oneBottle: {
        type: Number,
        default: null
    },
    formula: {
        type: String,
        default: null
    },
    polyethelene: {
        type: Number,
        default: null
    },
    noOfPETBottles: {
        type: Number,
        default: null
    },
    ef: { type: Number },
    emission: { type: Number },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
});

export default mongoose.model('Waste', waste, 'Waste');