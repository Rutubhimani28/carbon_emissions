import mongoose from "mongoose"

const production = new mongoose.Schema({
    material: { type: String },
    totalArea: { type: Number },
    emission: { type: Number },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
})

export default mongoose.model('Production', production, 'Production')