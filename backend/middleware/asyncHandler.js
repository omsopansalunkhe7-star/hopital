/**
 * asyncHandler.js
 * Wraps async route handlers so any rejected promise or thrown error is
 * automatically forwarded to Express's next(err) error handler.
 *
 * Without this wrapper every async route needs its own try/catch block.
 *
 * Usage:
 *   const asyncHandler = require("../middleware/asyncHandler");
 *
 *   router.get("/example", asyncHandler(async (req, res) => {
 *       const data = await SomeModel.find();
 *       res.json(data);
 *   }));
 */

/**
 * @param {Function} fn - An async Express route handler (req, res, next)
 * @returns {Function} A regular Express handler that catches async errors
 */
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;