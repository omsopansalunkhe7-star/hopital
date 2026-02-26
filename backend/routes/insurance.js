const express = require("express");
const router = express.Router();
const Hospital = require("../models/insurance");
const InsuranceRequest = require("../models/insuranceRequest");

router.post("/register", (req, res) => {
    const { email, password } = req.body;
    Hospital.findOne({ email }).then((data) => {
        if (!data) {
            Hospital.create({ email, password }).then(() => res.json({ status: "done" }));
        } else {
            res.json({ status: "exist" });
        }
    }).catch((err) => console.error(err));
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    Hospital.findOne({ email }).then((data) => {
        if (!data) return res.json({ status: "emailNotRegistered" });
        if (data.password === password) return res.json({ data, status: "authenticated" });
        return res.json({ status: "wrongPassword" });
    });
});

router.post("/session", (req, res) => {
    const { email, sessionKey } = req.body;
    Hospital.findOne({ email }, { password: 0 }).then((data) => {
        if (data && data.sessionKey === sessionKey) {
            return res.json({ data, status: "authenticated" });
        }
        res.json({ status: "unauthenticated" });
    });
});

router.post("/profile", (req, res) => {
    const { email, sessionKey, name, licenseNumber, mobile, address } = req.body;
    const profile = { name, licenseNumber, mobile, address };
    Hospital.findOneAndUpdate({ email }, { sessionKey, profile }, { new: true }).then((doc) => {
        res.json(doc);
    }).catch((err) => console.error(err));
});



// return all pending/previous insurance applications
router.get("/requests", (req, res) => {
    InsuranceRequest.find({}).then((data) => res.json(data)).catch((err) => {
        console.error(err);
        res.status(500).json({ status: "error" });
    });
});

module.exports = router;