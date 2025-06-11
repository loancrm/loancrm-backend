const express = require("express");
const { adminLogin, userLogout } = require("../controllers/userController");
const {
    createAccount,
    deleteAccount,
    getAccountById,
} = require("../controllers/accountController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
router.route("/").post(createAccount);



router
    .route("/:id")
    .get(validateToken, getAccountById)
    .delete(validateToken, deleteAccount);

module.exports = router;
