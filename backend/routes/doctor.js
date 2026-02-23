const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existing = await Doctor.findOne({ email });

        if (existing)
            return res.json({ status: "exist" });

        await Doctor.create({ email, password });

        res.json({ status: "done" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error" });
    }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const doctor = await Doctor.findOne({ email });

        if (!doctor)
            return res.json({ status: "emailNotRegistered" });

        if (doctor.password !== password)
            return res.json({ status: "wrongPassword" });

        // Generate session key
        const sessionKey = Math.random().toString(36).substring(2);

        doctor.sessionKey = sessionKey;
        await doctor.save();

        res.json({
            status: "authenticated",
            data: doctor,
            sessionKey
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error" });
    }
});


// ================= SESSION CHECK =================
router.post("/session", async (req, res) => {
    const { email, sessionKey } = req.body;

    try {
        const doctor = await Doctor.findOne({ email });

        if (doctor && doctor.sessionKey === sessionKey) {
            return res.json({ status: "authenticated", data: doctor });
        }

        res.json({ status: "unauthenticated" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error" });
    }
});


// ================= UPDATE PROFILE =================
router.post("/profile", async (req, res) => {
    const { email, sessionKey, name, registration, degree, fees, mobile, gender, DOB, address } = req.body;

    try {
        const doctor = await Doctor.findOne({ email });

        if (!doctor || doctor.sessionKey !== sessionKey)
            return res.json({ status: "unauthorized" });

        doctor.profile = { name, registration, degree, fees, mobile, gender, DOB, address };

        await doctor.save();

        res.json({ status: "updated", data: doctor });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error" });
    }
});


// ================= ADD MEDICAL REPORT =================
router.post("/add-report", async (req, res) => {
    const { doctorEmail, sessionKey, patientEmail, name, value } = req.body;

    try {
        const doctor = await Doctor.findOne({ email: doctorEmail });

        if (!doctor || doctor.sessionKey !== sessionKey)
            return res.json({ status: "unauthorized" });

        const patient = await Patient.findOne({ email: patientEmail });

        if (!patient)
            return res.json({ status: "patientNotFound" });

        // Initialize healthReport if not exists
        if (!patient.healthReport) {
            patient.healthReport = { basic: [] };
        }

        if (!patient.healthReport.basic) {
            patient.healthReport.basic = [];
        }

        patient.healthReport.basic.push({
            name,
            value,
            date: new Date()
        });

        await patient.save();

        res.json({ status: "reportAdded" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error" });
    }
});


module.exports = router;