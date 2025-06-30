const asyncHandler = require("express-async-handler");
const parseNestedJSON = require("../middleware/parseHandler");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { createClauseHandler } = require("../middleware/clauseHandler");
const dbConnect = require("../config/dbConnection");
const moment = require('moment-timezone');
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

// ✅ Create Razorpay Order
const createRazorpayOrder = asyncHandler(async (req, res) => {
    try {
        const { amount } = req.body;
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `order_rcpt_${Date.now()}`
        });

        res.status(200).json(order);
    } catch (err) {
        console.error("❌ Razorpay Order Creation Error:", err);
        res.status(500).send("Razorpay Order Creation Failed");
    }
});

// ✅ Utility to calculate correct start and end dates
async function calculateSubscriptionDates(accountId, durationDays) {
    const tz = 'Asia/Kolkata';
    const today = moment().tz(tz).startOf('day');
    let start_date;

    const latestSql = `
    SELECT end_date
    FROM subscriptions
    WHERE accountId = ?
    ORDER BY end_date DESC
    LIMIT 1
  `;

    const latestResult = await new Promise((resolve, reject) =>
        dbConnect.query(latestSql, [accountId], (err, result) =>
            err ? reject(err) : resolve(result)
        )
    );

    if (latestResult.length > 0) {
        const lastEndDate = moment(latestResult[0].end_date).tz(tz).startOf('day');

        if (lastEndDate.isSameOrAfter(today)) {
            // ⏩ Start the new subscription one day *after* last end date
            start_date = lastEndDate.clone().add(1, 'day');
        } else {
            start_date = today.clone();
        }
    } else {
        start_date = today.clone();
    }
    const end_date = start_date.clone().add(durationDays, 'days');
    return {
        formattedStart: start_date.format('YYYY-MM-DD'),
        formattedEnd: end_date.format('YYYY-MM-DD'),
    };
}


// ✅ Verify Razorpay Payment & Store Subscription & Transaction
const verifyAndStoreSubscription = asyncHandler(async (req, res) => {
    try {
        let {
            accountId,
            plan_name,
            plan_type,
            price,
            durationDays,
            auto_renew ,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        } = req.body;

        // 🔐 Verify Razorpay Signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).send("Invalid Razorpay signature");
        }

        // 📅 Compute Dates
        const { formattedStart, formattedEnd } = await calculateSubscriptionDates(accountId, durationDays);

        // 📝 Insert Subscription
        const subscriptionPayload = {
            accountId,
            plan_name,
            plan_type,
            price,
            start_date: formattedStart,
            end_date: formattedEnd,
            auto_renew,
            status: "Active"
        };

        const [subCols, subVals] = createClauseHandler(subscriptionPayload);
        const subscriptionSql = `INSERT INTO subscriptions (${subCols}) VALUES (${subVals})`;

        await new Promise((resolve, reject) =>
            dbConnect.query(subscriptionSql, (err) => (err ? reject(err) : resolve()))
        );

        // 💳 Insert Razorpay Transaction
        const txnPayload = {
            accountId,
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
            signature: razorpay_signature,
            plan_name,
            plan_type,
            amount_paid: price,
            currency: "INR",
            status: "Success",
        };

        const [txnCols, txnVals] = createClauseHandler(txnPayload);
        const txnSql = `INSERT INTO razorpay_transactions (${txnCols}) VALUES (${txnVals})`;

        await new Promise((resolve, reject) =>
            dbConnect.query(txnSql, (err) => (err ? reject(err) : resolve()))
        );

        res.status(200).send(true);
    } catch (error) {
        console.error("❌ verifyAndStoreSubscription error:", error);
        res.status(500).send("Something went wrong during payment verification");
    }
});

// ✅ Manual Subscription Creation (e.g. Free Trial)
const createSubscription = asyncHandler(async (req, res) => {
    try {
        let {
            accountId,
            plan_name,
            plan_type,
            price,
            durationDays,
            auto_renew 
        } = req.body;

        // ❌ If plan is Free Trial, check if one already exists
        if (plan_type === 'Free') {
            const freeTrialCheckSql = `
                SELECT id FROM subscriptions 
                WHERE accountId = ? AND plan_type = 'Free'
                LIMIT 1
            `;
            const existing = await new Promise((resolve, reject) =>
                dbConnect.query(freeTrialCheckSql, [accountId], (err, result) =>
                    err ? reject(err) : resolve(result)
                )
            );

            if (existing.length > 0) {
                return res.status(400).send(
                    "Free Trial already used for this account"
                );
            }
        }

        // 📅 Compute Dates
        const { formattedStart, formattedEnd } = await calculateSubscriptionDates(accountId, durationDays);

        const payload = {
            accountId,
            plan_name,
            plan_type,
            price,
            start_date: formattedStart,
            end_date: formattedEnd,
            auto_renew,
            status: "Active"
        };

        const [cols, vals] = createClauseHandler(payload);
        const insertSql = `INSERT INTO subscriptions (${cols}) VALUES (${vals})`;

        await new Promise((resolve, reject) =>
            dbConnect.query(insertSql, (err) => (err ? reject(err) : resolve()))
        );

        res.status(200).send(true);
    } catch (error) {
        console.error("❌ createSubscription error:", error);
        res.status(500).send("Error in Creating the Subscription");
    }
});

const getSubscriptionById = asyncHandler(async (req, res) => {
    try {
        const sql = `
      SELECT *
      FROM subscriptions
      WHERE accountId = ?
      ORDER BY end_date DESC
    `;

        dbConnect.query(sql, [req.params.id], (err, results) => {
            if (err) {
                console.error("getSubscriptionById error:", err);
                return res.status(500).send("Error in Fetching the Subscription");
            }

            if (!results || results.length === 0) {
                return res.status(200).send(null);
            }

            const today = new Date();

            // ✅ 1. Check for currently active subscription
            const currentActive = results.find(sub =>
                sub.status === 'Active' &&
                new Date(sub.start_date) <= today &&
                new Date(sub.end_date) >= today
            );

            // ✅ 2. If no active, fallback to most recent expired plan
            const recentExpired = results.find(sub =>
                sub.status === 'Expired' && new Date(sub.end_date) < today
            );

            // ✅ Final selection
            const selected = currentActive || recentExpired;

            res.status(200).send(selected ? parseNestedJSON([selected])[0] : null);
        });
    } catch (error) {
        console.error("❌ getSubscriptionById error:", error);
        res.status(500).send("Failed to get subscription");
    }
});


module.exports = {
    getSubscriptionById,
    createSubscription,
    createRazorpayOrder,
    verifyAndStoreSubscription
};
