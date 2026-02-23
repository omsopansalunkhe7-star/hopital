const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const router = express.Router();

const Patient = require("../models/patient");
const Doctor = require("../models/doctor");

router.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });
        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };
        instance.orders.create(options, (error, order) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

router.post("/verify", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registration, patientEmail, date } = req.body;

        const expectedSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (razorpay_signature !== expectedSign) {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }

        await Promise.all([
            Patient.updateOne({ email: patientEmail }, { $push: { doctorsList: { reg: registration, date } } }),
            Doctor.updateOne({ "profile.registration": registration }, { $push: { patientsList: { email: patientEmail, date } } }),
        ]);

        res.status(200).json({ message: "Payment verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

module.exports = router;