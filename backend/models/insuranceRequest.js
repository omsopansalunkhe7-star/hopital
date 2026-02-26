const mongoose = require("mongoose");

const insuranceRequestSchema = new mongoose.Schema({
    patientEmail: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("insuranceRequest", insuranceRequestSchema);
