// Shared admin session state
let adminSessionKey = null;

const getAdminSessionKey = () => adminSessionKey;
const setAdminSessionKey = (key) => { adminSessionKey = key; };

const requireAdminAuth = (req, res, next) => {
    // Support both query param (GET) and body (POST)
    const sessionKey = req.query.sessionKey || req.body.sessionKey;
    if (!sessionKey || sessionKey !== adminSessionKey) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};

module.exports = { requireAdminAuth, getAdminSessionKey, setAdminSessionKey };