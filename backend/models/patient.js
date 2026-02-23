const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    name: new mongoose.Schema({
        FName: String,
        LName: String,
    }),
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

const healthReportSchema = new mongoose.Schema({
    basic: [{ name: String, value: String, date: Date }],
    all: {
        name: [String],
        date: [Date],
        data: [Buffer],
    },
});

const patientSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    sessionKey: String,
    profile: profileSchema,
    healthReport: healthReportSchema,
    doctorsList: [{ reg: String, date: Date }],
});

module.exports = mongoose.model("patient", patientSchema);