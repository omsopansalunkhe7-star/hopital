const mongoose = require("mongoose");

const doctorProfileSchema = new mongoose.Schema({
    name: new mongoose.Schema({
        FName: String,
        LName: String,
    }),
    registration: String,
    degree: String,
    fees: Number,
    mobile: Number,
    gender: {
        type: String,
        enum: ["Male", "Female", "Transgender", "Other"],
    },
    DOB: Date,
    address: new mongoose.Schema({
        street: String,
        city: String,
        state: String,
        pin: Number,
    }),
});

const doctorSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    sessionKey: String,
    profile: doctorProfileSchema,
    patientsList: [{ email: String, date: Date }],
});

module.exports = mongoose.model("doctor", doctorSchema);