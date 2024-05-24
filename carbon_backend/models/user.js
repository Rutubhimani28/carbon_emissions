import mongoose from "mongoose"

const user = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
})

export default mongoose.model('User', user, 'User')