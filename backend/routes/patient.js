const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
const Doctor = require("../models/doctor");

router.post("/register", (req, res) => {
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
    const { email, password } = req.body;
    Patient.findOne({ email }).then((data) => {
        if (!data) return res.json({ status: "emailNotRegistered" });
        if (data.password === password) return res.json({ data, status: "authenticated" });
        return res.json({ status: "wrongPassword" });
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

module.exports = router;