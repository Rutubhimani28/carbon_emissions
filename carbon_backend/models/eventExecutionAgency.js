import mongoose from "mongoose"

const eventExecutionAgency = new mongoose.Schema({
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
    allocatedBudgetForYourActivity: { type: String },
    agencyTypeNeeded: { type: String },
    entertainment: { type: String },
    teamBuilding: { type: String },
    motivationalSpeaker: { type: String },
    emcee: { type: String },
    message: { type: String },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
})

export default mongoose.model('eventExecutionAgency', eventExecutionAgency, 'eventExecutionAgency')
