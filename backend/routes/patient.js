
const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const InsuranceRequest = require("../models/insuranceRequest");
const { hashPassword, comparePassword } = require("../middleware/hashPassword");

router.post("/register", hashPassword, (req, res) => {
    const { email, password } = req.body;
    Patient.findOne({ email }).then((data) => {
        if (!data) {
            Patient.create({ email, password }).then(() => res.json({ status: "done" }));
        } else {
            res.json({ status: "exist" });
        }
    }).catch((err) => console.error(err));
});

router.post("/login", (req, res) => {
    comparePassword(Patient)(req, res, () => {
        // This callback is executed after comparePassword middleware succeeds
        const { user } = req; // user is attached by the middleware
        res.json({ data: user, status: "authenticated" });
    });
});

router.post("/session", (req, res) => {
    const { email, sessionKey } = req.body;
    Patient.findOne({ email }, { password: 0 }).then((data) => {
        if (data && data.sessionKey === sessionKey) {
            return res.json({ data, status: "authenticated" });
        }
        res.json({ status: "unauthenticated" });
    });
});

router.post("/profile", (req, res) => {
    const { email, sessionKey, name, mobile, gender, DOB, address } = req.body;
    const profile = { name, mobile, gender, DOB, address };
    Patient.findOneAndUpdate({ email }, { sessionKey, profile }, { new: true }).then((doc) => {
        res.json(doc);
    }).catch((err) => console.error(err));
});

router.get("/doctors", (req, res) => {
    Doctor.find({}, { password: 0, sessionKey: 0 }).then((data) => {
        if (data) res.json(data);
    });
});

// insurance application route
router.post("/apply-insurance", (req, res) => {
    const { email, sessionKey } = req.body;
    // basic session check, reuse existing logic
    Patient.findOne({ email }).then((patient) => {
        if (!patient || patient.sessionKey !== sessionKey) {
            return res.json({ status: "unauthenticated" });
        }
        InsuranceRequest.create({ patientEmail: email })
            .then(() => res.json({ status: "applied" }))
            .catch((err) => {
                console.error(err);
                res.status(500).json({ status: "error" });
            });
    });
});

module.exports = router;
