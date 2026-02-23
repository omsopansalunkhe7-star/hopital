/**
 * hashPassword.js
 * Middleware to hash passwords before storing them and to verify hashed
 * passwords during login — replacing the current plaintext comparison.
 *
 * Requires: npm install bcryptjs
 *
 * Usage in routes:
 *   const { hashPassword, comparePassword } = require("../middleware/hashPassword");
 *
 *   // On register — place before the DB insert:
 *   router.post("/register", validateRegister, hashPassword, handler);
 *
 *   // On login — place before the password comparison:
 *   router.post("/login", validateLogin, comparePassword(Model), handler);
 */

const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 12;

/**
 * Hashes req.body.password in-place before the route handler runs.
 * The original plaintext password is replaced so it is never stored.
 */
const hashPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        if (!password) return next();
        req.body.password = await bcrypt.hash(password, SALT_ROUNDS);
        next();
    } catch (err) {
        next(err);
    }
};

/**
 * Factory that returns a middleware which:
 *  1. Finds the user by email using the supplied Model
 *  2. Compares req.body.password against the stored hash
 *  3. Attaches the user doc to req.user and calls next() on success
 *  4. Returns a 401 response on failure (deliberately vague to prevent enumeration)
 *
 * @param {Model} Model - Mongoose model (Patient, Doctor, etc.)
 */
const comparePassword = (Model) => async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Model.findOne({ email });

        if (!user) {
            // Use a generic message to avoid leaking whether the email exists
            return res.status(401).json({
                status: "unauthenticated",
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                status: "unauthenticated",
                message: "Invalid email or password",
            });
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = { hashPassword, comparePassword };