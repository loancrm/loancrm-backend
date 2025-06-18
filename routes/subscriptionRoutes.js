const express = require("express");

const validateToken = require("../middleware/validateTokenHandler");
const { getSubscriptionById, createSubscription } = require("../controllers/subscriptionController");
const router = express.Router();
router
    .route("/")
    .post(validateToken, createSubscription);

router
    .route("/:id")
    .get(validateToken, getSubscriptionById);

module.exports = router;
