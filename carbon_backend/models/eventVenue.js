import mongoose from "mongoose"

const eventVenue = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    mobile: { type: String },
    designation: { type: String },
    organisationName: { type: String },
    fixedDateFrom: { type: String },
    fixedDateTo: { type: String },
    alternateDatesFrom: { type: String },
    alternateDatesTo: { type: String },
    city: { type: String },
    preferredHotels: { type: String },
    eventType: { type: String },
    eventSizeNoOfPax: { type: String },
    foodBeverages: { type: String },
    roomsNeeded: { type: String },
    airportTransferNeeded: { type: String },
    message: { type: String },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
})

export default mongoose.model('eventVenue', eventVenue, 'eventVenue')