const cron = require('node-cron');
const dbConnect = require('../config/dbConnection');

// Function to start the cron job
function startSubscriptionExpiryJob() {
  // Run every day at midnight
  cron.schedule('0 0 * * *', () => {
    console.log("⏰ Running subscription expiry job...");

    const query = `
      UPDATE subscriptions
      SET status = 'Expired'
      WHERE status = 'Active' AND end_date < CURDATE()
    `;

    dbConnect.query(query, (err, result) => {
      if (err) {
        console.error("❌ Error expiring subscriptions:", err);
      } else {
        console.log(`✅ Expired subscriptions: ${result.affectedRows}`);
      }
    });
  });

  console.log("📅 Subscription expiry cron job scheduled.");
}

module.exports = startSubscriptionExpiryJob;
