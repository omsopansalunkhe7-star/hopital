/**
 * logger.js
 * Lightweight structured HTTP request logger.
 * Logs method, URL, status code, response time, and IP for every request.
 * In production, swap for a library like morgan + winston for log rotation.
 */

const LOG_LEVEL = process.env.LOG_LEVEL || "info";

const COLORS = {
    reset:   "\x1b[0m",
    green:   "\x1b[32m",
    yellow:  "\x1b[33m",
    red:     "\x1b[31m",
    cyan:    "\x1b[36m",
    grey:    "\x1b[90m",
    magenta: "\x1b[35m",
};

const statusColor = (code) => {
    if (code >= 500) return COLORS.red;
    if (code >= 400) return COLORS.yellow;
    if (code >= 300) return COLORS.cyan;
    return COLORS.green;
};

const methodColor = (method) => {
    const map = {
        GET:    COLORS.green,
        POST:   COLORS.cyan,
        PUT:    COLORS.yellow,
        PATCH:  COLORS.magenta,
        DELETE: COLORS.red,
    };
    return map[method] || COLORS.reset;
};

/**
 * HTTP request logger middleware.
 */
const requestLogger = (req, res, next) => {
    const start = Date.now();
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    res.on("finish", () => {
        const ms      = Date.now() - start;
        const code    = res.statusCode;
        const method  = req.method;
        const url     = req.originalUrl;
        const ts      = new Date().toISOString();

        const line = [
            `${COLORS.grey}${ts}${COLORS.reset}`,
            `${methodColor(method)}${method.padEnd(6)}${COLORS.reset}`,
            url.padEnd(40),
            `${statusColor(code)}${code}${COLORS.reset}`,
            `${ms}ms`,
            `${COLORS.grey}${ip}${COLORS.reset}`,
        ].join("  ");

        console.log(line);
    });

    next();
};

/**
 * Development-only body logger — logs the sanitized request body.
 * Never use in production; it would expose sensitive fields.
 */
const bodyLogger = (req, res, next) => {
    if (process.env.NODE_ENV !== "development" || LOG_LEVEL !== "debug") {
        return next();
    }

    if (req.body && Object.keys(req.body).length) {
        const sanitized = { ...req.body };
        // Redact sensitive fields
        for (const key of ["password", "sessionKey", "razorpay_signature", "key_secret"]) {
            if (key in sanitized) sanitized[key] = "[REDACTED]";
        }
        console.log(`${COLORS.grey}  body:${COLORS.reset}`, JSON.stringify(sanitized));
    }

    next();
};

module.exports = { requestLogger, bodyLogger };