const mongoose = require("mongoose");

const hospitalProfileSchema = new mongoose.Schema({
    name: String,
    licenseNumber: String,
    mobile: Number,
    address: new mongoose.Schema({
        street: String,
        city: String,
        state: String,
        pin: Number,
    }),
});

const hospitalSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    sessionKey: String,
    profile: hospitalProfileSchema,
});

module.exports = mongoose.model("hospital", hospitalSchema);