const mongoose = require("mongoose");

const insuranceProfileSchema = new mongoose.Schema({
    companyName: String,
    registrationNumber: String,
    mobile: Number,
    address: new mongoose.Schema({
        street: String,
        city: String,
        state: String,
        pin: Number,
    }),
});

const insuranceSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    sessionKey: String,
    profile: insuranceProfileSchema,
});

module.exports = mongoose.model("insurance", insuranceSchema);