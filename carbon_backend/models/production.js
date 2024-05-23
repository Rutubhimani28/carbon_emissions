const mongoose = require('mongoose');

const production = new mongoose.Schema({
    materialName: { type: String },
    amountUsed: { type: Number },
    totalEmissions: { type: Number },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Production', production, 'Production');
