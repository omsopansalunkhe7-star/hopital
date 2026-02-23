/**
 * rateLimiter.js
 * In-memory rate limiting middleware.
 * For multi-process / clustered deployments, replace the in-memory store
 * with a Redis-backed solution (e.g. rate-limiter-flexible + ioredis).
 *
 * Three limiters are exported:
 *  - globalLimiter   : applied to every route (generous ceiling)
 *  - authLimiter     : stricter limit for login / register endpoints
 *  - paymentLimiter  : very strict limit for payment endpoints
 */

/**
 * Simple sliding-window rate limiter factory.
 * @param {object} options
 * @param {number} options.windowMs   - Window size in milliseconds
 * @param {number} options.max        - Max requests per window per IP
 * @param {string} options.message    - Error message when limit exceeded
 */
const createLimiter = ({ windowMs, max, message }) => {
    // Map of IP -> array of timestamps within the current window
    const store = new Map();

    // Cleanup stale IPs every 10 minutes to prevent memory leaks
    setInterval(() => {
        const now = Date.now();
        for (const [ip, timestamps] of store.entries()) {
            const fresh = timestamps.filter((t) => now - t < windowMs);
            if (fresh.length === 0) {
                store.delete(ip);
            } else {
                store.set(ip, fresh);
            }
        }
    }, 10 * 60 * 1000).unref(); // .unref() so the timer doesn't block process exit

    return (req, res, next) => {
        const ip  = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const now = Date.now();

        const timestamps = (store.get(ip) || []).filter((t) => now - t < windowMs);
        timestamps.push(now);
        store.set(ip, timestamps);

        const remaining = Math.max(0, max - timestamps.length);
        const resetAt   = Math.min(...timestamps) + windowMs;

        // Set standard rate-limit headers
        res.setHeader("X-RateLimit-Limit",     max);
        res.setHeader("X-RateLimit-Remaining", remaining);
        res.setHeader("X-RateLimit-Reset",     Math.ceil(resetAt / 1000));

        if (timestamps.length > max) {
            const retryAfter = Math.ceil((resetAt - now) / 1000);
            res.setHeader("Retry-After", retryAfter);
            return res.status(429).json({
                status: "rateLimited",
                message,
                retryAfter,
            });
        }

        next();
    };
};

// ---------- exported limiters ----------

/** Applied globally to every incoming request. */
const globalLimiter = createLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300,
    message: "Too many requests, please try again later",
});

/** Applied to login and register routes to slow brute-force attacks. */
const authLimiter = createLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message: "Too many authentication attempts, please try again in 15 minutes",
});

/** Applied to payment routes. */
const paymentLimiter = createLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 30,
    message: "Too many payment requests, please try again later",
});

module.exports = { globalLimiter, authLimiter, paymentLimiter };