import mongoose from "mongoose"

const digitalContent = new mongoose.Schema({
    type: { type: String },
    count: { type: Number },
    mb: { type: Number },
    noOfAttendees: { type: Number },
    noOfHours: { type: Number },
    serviceLifeOfLaptop: { type: Number },
    ef: { type: Number },
    emission: { type: Number },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
})

export default mongoose.model('DigitalContent', digitalContent, 'DigitalContent')