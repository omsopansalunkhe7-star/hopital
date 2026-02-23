/**
 * errorHandler.js
 * Centralized error handling middleware. Must be registered LAST in server.js
 * with four parameters so Express recognises it as an error handler.
 *
 * Usage in server.js:
 *   const { notFound, errorHandler } = require("./middleware/errorHandler");
 *   app.use(notFound);
 *   app.use(errorHandler);
 */

/**
 * 404 handler — catches requests that didn't match any route.
 */
const notFound = (req, res, next) => {
    const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    err.status = 404;
    next(err);
};

/**
 * Global error handler.
 * Distinguishes between operational errors (known status codes) and
 * unexpected programming errors (500).
 */
const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
    const isDev = process.env.NODE_ENV === "development";

    // Mongoose validation errors
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            status: "validationError",
            errors: messages,
        });
    }

    // Mongoose duplicate key errors (e.g. unique index violation)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || "field";
        return res.status(409).json({
            status: "conflict",
            message: `A record with that ${field} already exists`,
        });
    }

    // Mongoose cast errors (e.g. invalid ObjectId)
    if (err.name === "CastError") {
        return res.status(400).json({
            status: "badRequest",
            message: `Invalid value for field '${err.path}'`,
        });
    }

    // Operational errors with an explicit HTTP status
    if (err.status) {
        return res.status(err.status).json({
            status: "error",
            message: err.message,
            ...(isDev && { stack: err.stack }),
        });
    }

    // Unexpected errors — don't leak internals in production
    console.error("[Unhandled Error]", err);
    res.status(500).json({
        status: "error",
        message: isDev ? err.message : "An unexpected server error occurred",
        ...(isDev && { stack: err.stack }),
    });
};

module.exports = { notFound, errorHandler };