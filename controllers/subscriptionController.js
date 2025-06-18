const asyncHandler = require("express-async-handler");
const parseNestedJSON = require("../middleware/parseHandler");
const {
    createClauseHandler,
    updateClauseHandler,
} = require("../middleware/clauseHandler");
const createSubscription = asyncHandler((req, res) => {
    try {
        const { accountId, plan_name, plan_type, price, start_date, end_date, auto_renew } = req.body;

        // Optional: Prevent duplicate active subscription for the same account
        const checkSql = `SELECT * FROM subscriptions WHERE accountId = ? AND status = 'Active'`;
        req.dbQuery(checkSql, [accountId], (checkErr, checkResult) => {
            if (checkErr) {
                console.error("createSubscription check error:", checkErr);
                return res.status(500).send("Error in Checking the Subscription");
            }
            if (checkResult.length > 0) {
                return res.status(400).send("User already has an active subscription");
            }

            // Build insert query
            const payload = {
                accountId,
                plan_name,
                plan_type,
                price,
                start_date,
                end_date,
                auto_renew: auto_renew ?? true,
                status: 'Active',

            };

            const createClause = createClauseHandler(payload);
            const insertSql = `INSERT INTO subscriptions (${createClause[0]}) VALUES (${createClause[1]})`;

            req.dbQuery(insertSql, (err, result) => {
                if (err) {
                    console.error("createSubscription insertion error:", err);
                    return res.status(500).send("Error in Creating the Subscription");
                }
                res.status(200).send(true);
            });
        });
    } catch (error) {
        console.error("createSubscription unexpected error:", error);
        res.status(500).send("Error in Creating the Subscription");
    }
});
const getSubscriptionById = asyncHandler((req, res) => {
    console.log(req.params)
    const sql = `SELECT * FROM subscriptions WHERE accountId = ${req.params.id}`;
    req.dbQuery(sql, (err, result) => {
        if (err) {
            console.error("getSubscriptionById error:", err);
            return res.status(500).send("Error in Fetching the Subscription");
        }
        result = parseNestedJSON(result);
        res.status(200).send(result[0]);
    });
});
module.exports = {
    getSubscriptionById,
    createSubscription,
    // other functions
};
