const asyncHandler = require('express-async-handler');
const moment = require('moment');
const dbConnect = require("../config/dbConnection");

const checkSubscriptionValidity = asyncHandler((req, res, next) => {
    const accountId = req.user.accountId; // Assuming validateToken sets req.user

    const checkSql = `
        SELECT id, plan_name, end_date 
        FROM subscriptions 
        WHERE accountId = ? 
        ORDER BY end_date DESC 
        LIMIT 1
    `;

    dbConnect.query(checkSql, [accountId], (err, results) => {
        if (err) {
            console.error('Subscription check error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const subscription = results[0];

        if (!subscription) {
            return res.status(403).json({ message: 'No active subscription found' });
        }

        const isExpired = moment(subscription.end_date).isBefore(moment(), 'day');

        if (isExpired) {
            // ✅ Auto-expire the subscription in DB
            const updateSql = `
                UPDATE subscriptions 
                SET status = 'Expired' 
                WHERE id = ?
            `;

            dbConnect.query(updateSql, [subscription.id], (updateErr) => {
                if (updateErr) {
                    console.error('Failed to mark subscription as expired:', updateErr);
                } else {
                    console.log(`Subscription ID ${subscription.id} marked as Expired`);
                }

                // Only block non-GET requests
                if (req.method !== 'GET') {
                    return res.status(400).send(
                        `Your ${subscription.plan_name} subscription has expired. Please upgrade to continue.`
                    );
                }

                next();
            });
        } else {
            // ✅ Subscription still valid
            next();
        }
    });
});

module.exports = checkSubscriptionValidity;
