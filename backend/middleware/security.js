/**
 * security.js
 * Adds HTTP security headers and basic request hygiene.
 * For production, consider using the `helmet` npm package which covers
 * a broader set of headers and is kept up to date with best practices.
 *
 * Usage in server.js:
 *   const { securityHeaders, sanitizeBody } = require("./middleware/security");
 *   app.use(securityHeaders);
 *   app.use(sanitizeBody);
 */

/**
 * Sets common security-related HTTP response headers.
 */
const securityHeaders = (req, res, next) => {
    // Prevent browsers from MIME-sniffing the content type
    res.setHeader("X-Content-Type-Options", "nosniff");

    // Deny framing to prevent clickjacking
    res.setHeader("X-Frame-Options", "DENY");

    // Basic XSS protection for older browsers
    res.setHeader("X-XSS-Protection", "1; mode=block");

    // Only send referrer for same-origin requests
    res.setHeader("Referrer-Policy", "same-origin");

    // Restrict what browser features are available
    res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");

    // Strict Content-Security-Policy for an API (no HTML pages served)
    res.setHeader("Content-Security-Policy", "default-src 'none'");

    // Enforce HTTPS for 1 year in production
    if (process.env.NODE_ENV === "production") {
        res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    }

    // Remove the X-Powered-By header so the tech stack isn't advertised
    res.removeHeader("X-Powered-By");

    next();
};

/**
 * Strips leading/trailing whitespace from all string fields in req.body.
 * Also converts email fields to lowercase for consistent lookups.
 */
const sanitizeBody = (req, res, next) => {
    if (req.body && typeof req.body === "object") {
        const sanitize = (obj) => {
            for (const key of Object.keys(obj)) {
                const val = obj[key];
                if (typeof val === "string") {
                    obj[key] = val.trim();
                    if (key.toLowerCase().includes("email")) {
                        obj[key] = obj[key].toLowerCase();
                    }
                } else if (val && typeof val === "object" && !Array.isArray(val)) {
                    sanitize(val); // Recurse into nested objects (e.g. address, name)
                }
            }
        };
        sanitize(req.body);
    }
    next();
};

/**
 * Guards against HTTP parameter pollution by ensuring key query/body params
 * are always scalars, not arrays (e.g. prevents ?email=a&email=b attacks).
 */
const preventParamPollution = (req, res, next) => {
    const sensitiveKeys = ["email", "password", "sessionKey", "amount"];

    for (const key of sensitiveKeys) {
        if (req.query[key] && Array.isArray(req.query[key])) {
            req.query[key] = req.query[key][0];
        }
        if (req.body && req.body[key] && Array.isArray(req.body[key])) {
            req.body[key] = req.body[key][0];
        }
    }

    next();
};

module.exports = { securityHeaders, sanitizeBody, preventParamPollution };