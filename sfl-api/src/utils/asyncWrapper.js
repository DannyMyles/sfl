const asyncWrapper = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.error("Unhandled error:", error.message, error.stack);
        res.status(500).json({ error: "An unexpected error occurred." });
    }
};


module.exports = asyncWrapper