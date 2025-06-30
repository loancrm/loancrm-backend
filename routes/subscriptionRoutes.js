const express = require("express");

const validateToken = require("../middleware/validateTokenHandler");
const { getSubscriptionById, createSubscription, createRazorpayOrder, verifyAndStoreSubscription } = require("../controllers/subscriptionController");
const router = express.Router();
router
    .route("/")
    .post(validateToken, createSubscription);

router
    .route("/:id")
    .get(validateToken, getSubscriptionById);
router.post('/razorpay/order', validateToken, createRazorpayOrder);
router.post('/razorpay/verify', validateToken, verifyAndStoreSubscription);
module.exports = router;
