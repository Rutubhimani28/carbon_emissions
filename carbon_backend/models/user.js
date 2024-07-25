import mongoose from "mongoose";

// const user = new mongoose.Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     emailAddress: { type: String, required: true },
//     phoneNumber: { type: Number, required: true },
//     password: { type: String, required: true },
//     createdOn: { type: Date, default: Date.now },
//     modifiedOn: { type: Date, default: Date.now }
// });

const user = new mongoose.Schema({
    role: { type: String, required: true, default: 'user' },
    loginId: { type: String, required: true },       // Password Reset will go to this mail id
    password: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },

    companyName: { type: String, required: true },
    companyWebsite: { type: String, required: true },
    regOffAddrs: { type: String, required: true },
    regOffCountry: { type: String, required: true },
    regOffPhoneNo: { type: String, required: true },
    cnctPerson: { type: String, required: true },
    cnctPersonBusEmail: { type: String, required: true },
    cnctPersonMob: { type: String, required: true },
    altCnctPerson: { type: String, required: true },
    altCnctPersonBusEmail: { type: String, required: true },
    altCnctPersonMob: { type: String, required: true },
    escCnctPerson: { type: String, required: true },
    escCnctPersonBusEmail: { type: String, required: true },
    escCnctPersonMob: { type: String, required: true },
    subscriptionType: { type: String, required: true },
    subscriptionStart: { type: Date, required: true },
    subscriptionEnd: { type: Date, required: true },
    paymentReceivedDate: { type: Date, required: true },
    paymentRemainderDate: { type: Date, required: true },
    logo: { type: String, required: true },
    resetPswdToken: { type: String, default: null },

    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now },

    // deleted: false
});

export default mongoose.model('User', user, 'User');
