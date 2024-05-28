import mongoose from "mongoose";

const email = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    receiver: [
        { type: String }
    ],
    subject: { type: String },
    templateName: { type: String },
    data: {
        type: Object,
    },
    createdOn: { type: Date, default: Date.now },
});

export default mongoose.model('Email', email, 'Email');