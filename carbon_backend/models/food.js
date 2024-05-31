import mongoose from "mongoose";

const food = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    noOfPax: { type: Number },
    ef: { type: Number },
    emission: { type: Number },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
});

export default mongoose.model('Food', food, 'Food');