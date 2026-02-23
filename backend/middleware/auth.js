/**
 * auth.js
 * Session authentication middleware for each user type.
 * Reads { email, sessionKey } from req.body, verifies against DB,
 * and attaches the document to req.user on success.
 */

const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");
const Insurance = require("../models/insurance");

/**
 * Factory that creates an auth middleware for a given Mongoose model.
 * @param {Model} Model - The Mongoose model to query
 * @param {string} label - Human-readable name for error messages
 */
const createAuthMiddleware = (Model, label) => async (req, res, next) => {
    const { email, sessionKey } = req.body;

    if (!email || !sessionKey) {
        return res.status(401).json({
            status: "unauthenticated",
            message: "email and sessionKey are required",
        });
    }

    try {
        const user = await Model.findOne({ email }, { password: 0 });

        if (!user) {
            return res.status(401).json({
                status: "unauthenticated",
                message: `${label} not found`,
            });
        }

        if (user.sessionKey !== sessionKey) {
            return res.status(401).json({
                status: "unauthenticated",
                message: "Invalid session key",
            });
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

const authenticatePatient  = createAuthMiddleware(Patient,  "Patient");
const authenticateDoctor   = createAuthMiddleware(Doctor,   "Doctor");
const authenticateHospital = createAuthMiddleware(Hospital, "Hospital");
const authenticateInsurance = createAuthMiddleware(Insurance, "Insurance company");

module.exports = {
    authenticatePatient,
    authenticateDoctor,
    authenticateHospital,
    authenticateInsurance,
};