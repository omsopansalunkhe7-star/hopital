/**
 * validate.js
 * Input validation middleware. Each exported function validates the
 * req.body fields for a specific route and returns 400 with descriptive
 * errors if anything is missing or malformed.
 */

// ---------- helpers ----------

const GENDER_VALUES = ["Male", "Female", "Transgender", "Other"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PIN_RE   = /^\d{6}$/;

/**
 * Returns an array of error strings. Empty array = valid.
 * @param {object} fields - { fieldName: value }
 * @param {string[]} required - field names that must be present & non-empty
 */
const collectErrors = (fields, required) => {
    const errors = [];
    for (const key of required) {
        const val = fields[key];
        if (val === undefined || val === null || String(val).trim() === "") {
            errors.push(`'${key}' is required`);
        }
    }
    return errors;
};

const fail = (res, errors) =>
    res.status(400).json({ status: "validationError", errors });

// ---------- shared address check ----------
const validateAddress = (address, errors) => {
    if (!address || typeof address !== "object") {
        errors.push("'address' must be an object");
        return;
    }
    for (const key of ["street", "city", "state", "pin"]) {
        if (!address[key]) errors.push(`'address.${key}' is required`);
    }
    if (address.pin && !PIN_RE.test(String(address.pin))) {
        errors.push("'address.pin' must be a 6-digit number");
    }
};

// ---------- auth routes ----------

const validateRegister = (req, res, next) => {
    const { email, password } = req.body;
    const errors = collectErrors({ email, password }, ["email", "password"]);

    if (email && !EMAIL_RE.test(email)) errors.push("'email' is invalid");
    if (password && password.length < 6)
        errors.push("'password' must be at least 6 characters");

    if (errors.length) return fail(res, errors);
    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = collectErrors({ email, password }, ["email", "password"]);
    if (email && !EMAIL_RE.test(email)) errors.push("'email' is invalid");
    if (errors.length) return fail(res, errors);
    next();
};

const validateSession = (req, res, next) => {
    const { email, sessionKey } = req.body;
    const errors = collectErrors({ email, sessionKey }, ["email", "sessionKey"]);
    if (errors.length) return fail(res, errors);
    next();
};

// ---------- profile routes ----------

const validatePatientProfile = (req, res, next) => {
    const { email, sessionKey, name, mobile, gender, DOB, address } = req.body;
    const errors = collectErrors(
        { email, sessionKey, mobile, gender, DOB },
        ["email", "sessionKey", "mobile", "gender", "DOB"]
    );

    if (!name || !name.FName || !name.LName)
        errors.push("'name.FName' and 'name.LName' are required");

    if (gender && !GENDER_VALUES.includes(gender))
        errors.push(`'gender' must be one of: ${GENDER_VALUES.join(", ")}`);

    if (DOB && isNaN(Date.parse(DOB)))
        errors.push("'DOB' must be a valid date");

    if (mobile && !/^\d{10}$/.test(String(mobile)))
        errors.push("'mobile' must be a 10-digit number");

    validateAddress(address, errors);

    if (errors.length) return fail(res, errors);
    next();
};

const validateDoctorProfile = (req, res, next) => {
    const { email, sessionKey, name, registration, degree, fees, mobile, gender, DOB, address } = req.body;
    const errors = collectErrors(
        { email, sessionKey, registration, degree, fees, mobile, gender, DOB },
        ["email", "sessionKey", "registration", "degree", "fees", "mobile", "gender", "DOB"]
    );

    if (!name || !name.FName || !name.LName)
        errors.push("'name.FName' and 'name.LName' are required");

    if (gender && !GENDER_VALUES.includes(gender))
        errors.push(`'gender' must be one of: ${GENDER_VALUES.join(", ")}`);

    if (DOB && isNaN(Date.parse(DOB)))
        errors.push("'DOB' must be a valid date");

    if (fees && (isNaN(fees) || Number(fees) < 0))
        errors.push("'fees' must be a non-negative number");

    if (mobile && !/^\d{10}$/.test(String(mobile)))
        errors.push("'mobile' must be a 10-digit number");

    validateAddress(address, errors);

    if (errors.length) return fail(res, errors);
    next();
};

const validateHospitalProfile = (req, res, next) => {
    const { email, sessionKey, name, licenseNumber, mobile, address } = req.body;
    const errors = collectErrors(
        { email, sessionKey, name, licenseNumber, mobile },
        ["email", "sessionKey", "name", "licenseNumber", "mobile"]
    );

    if (mobile && !/^\d{10}$/.test(String(mobile)))
        errors.push("'mobile' must be a 10-digit number");

    validateAddress(address, errors);

    if (errors.length) return fail(res, errors);
    next();
};

const validateInsuranceProfile = (req, res, next) => {
    const { email, sessionKey, companyName, registrationNumber, mobile, address } = req.body;
    const errors = collectErrors(
        { email, sessionKey, companyName, registrationNumber, mobile },
        ["email", "sessionKey", "companyName", "registrationNumber", "mobile"]
    );

    if (mobile && !/^\d{10}$/.test(String(mobile)))
        errors.push("'mobile' must be a 10-digit number");

    validateAddress(address, errors);

    if (errors.length) return fail(res, errors);
    next();
};

// ---------- payment routes ----------

const validatePaymentOrder = (req, res, next) => {
    const { amount } = req.body;
    const errors = collectErrors({ amount }, ["amount"]);

    if (amount !== undefined && (isNaN(amount) || Number(amount) <= 0))
        errors.push("'amount' must be a positive number");

    if (errors.length) return fail(res, errors);
    next();
};

const validatePaymentVerify = (req, res, next) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registration, patientEmail, date } = req.body;
    const errors = collectErrors(
        { razorpay_order_id, razorpay_payment_id, razorpay_signature, registration, patientEmail, date },
        ["razorpay_order_id", "razorpay_payment_id", "razorpay_signature", "registration", "patientEmail", "date"]
    );

    if (patientEmail && !EMAIL_RE.test(patientEmail))
        errors.push("'patientEmail' is invalid");

    if (errors.length) return fail(res, errors);
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    validateSession,
    validatePatientProfile,
    validateDoctorProfile,
    validateHospitalProfile,
    validateInsuranceProfile,
    validatePaymentOrder,
    validatePaymentVerify,
};