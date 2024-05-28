import mongoose from "mongoose"

const contactUs = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    organisation: { type: String },
    designation: { type: String },
    workEmail: { type: String },
    mobile: { type: String },
    message: { type: String },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
})

export default mongoose.model('contactUs', contactUs, 'contactUs')