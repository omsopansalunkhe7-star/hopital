const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospital");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existing = await Hospital.findOne({ email });
        if (existing) return res.json({ status: "exist" });

        await Hospital.create({ email, password });
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
        const hospital = await Hospital.findOne({ email });

        if (!hospital)
            return res.json({ status: "emailNotRegistered" });

        if (hospital.password !== password)
            return res.json({ status: "wrongPassword" });

        const sessionKey = Math.random().toString(36).substring(2);

        hospital.sessionKey = sessionKey;
        await hospital.save();

        res.json({
            status: "authenticated",
            data: hospital,
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
        const hospital = await Hospital.findOne({ email });

        if (hospital && hospital.sessionKey === sessionKey) {
            return res.json({ status: "authenticated", data: hospital });
        }

        res.json({ status: "unauthenticated" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error" });
    }
});


// ================= UPDATE PROFILE =================
router.post("/profile", async (req, res) => {
    const { email, sessionKey, name, licenseNumber, mobile, address } = req.body;

    try {
        const hospital = await Hospital.findOne({ email });

        if (!hospital || hospital.sessionKey !== sessionKey)
            return res.json({ status: "unauthorized" });

        hospital.profile = { name, licenseNumber, mobile, address };
        await hospital.save();

        res.json({ status: "updated", data: hospital });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error" });
    }
});


module.exports = router;