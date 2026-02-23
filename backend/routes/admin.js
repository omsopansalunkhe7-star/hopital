const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");
const Insurance = require("../models/insurance");
const { requireAdminAuth, setAdminSessionKey } = require("../middleware/adminAuth");

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email !== process.env.ADMIN_EMAIL) {
        return res.json({ status: "emailNotRegistered" });
    }
    if (password !== process.env.ADMIN_PASSWORD) {
        return res.json({ status: "wrongPassword" });
    }
    const sessionKey = crypto.randomBytes(16).toString("hex");
    setAdminSessionKey(sessionKey);
    res.json({ status: "authenticated", sessionKey });
});

router.post("/session", (req, res) => {
    // requireAdminAuth will reject if invalid; if we reach here, it's valid
    // We apply middleware inline so the route still exists for the check
    const { sessionKey } = req.body;
    const { getAdminSessionKey } = require("../middleware/adminAuth");
    if (sessionKey && sessionKey === getAdminSessionKey()) {
        return res.json({ status: "authenticated" });
    }
    res.json({ status: "unauthenticated" });
});

router.get("/patients", requireAdminAuth, (req, res) => {
    Patient.find({}, { password: 0, sessionKey: 0 }).then((data) => res.json(data));
});

router.get("/doctors", requireAdminAuth, (req, res) => {
    Doctor.find({}, { password: 0, sessionKey: 0 }).then((data) => res.json(data));
});

router.get("/hospitals", requireAdminAuth, (req, res) => {
    Hospital.find({}, { password: 0, sessionKey: 0 }).then((data) => res.json(data));
});

router.get("/insurances", requireAdminAuth, (req, res) => {
    Insurance.find({}, { password: 0, sessionKey: 0 }).then((data) => res.json(data));
});

module.exports = router;