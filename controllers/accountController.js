const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const dbConnect = require("../config/dbConnection");
const handleGlobalFilters = require("../middleware/filtersHandler");
const parseNestedJSON = require("../middleware/parseHandler");
const { generateRandomNumber } = require("../middleware/valueGenerator");

const {
    createClauseHandler,
    updateClauseHandler,
} = require("../middleware/clauseHandler");

let leadUsersData = [];

const createAccount = asyncHandler(async (req, res) => {
    try {
        const { password, emailId, mobile } = req.body;
        // const encryptedPassword = await bcrypt.hash(password, 12);

        const accountId = generateRandomNumber(6);
        req.body["accountId"] = accountId;
        req.body["status"] = 1;
        req.body["lastStatus"] = 1;
        req.body["createdBy"] = req.body.name;
        req.body["updatedBy"] = req.body.name;
        // req.body["password"] = encryptedPassword;

        const checkIfExistsQuery = `SELECT * FROM accounts WHERE emailId = ? OR mobile = ?`;
        dbConnect.query(checkIfExistsQuery, [emailId, mobile], (err, results) => {
            if (err) {
                console.error("Error checking if user exists:", err);
                return res.status(500).send("Error in checking user");
            }

            if (results.length > 0) {
                return res.status(400).send("User with this email or phone number already exists");
            }

            const createClause = createClauseHandler(req.body);
            const sql = `INSERT INTO accounts (${createClause[0]}) VALUES (${createClause[1]})`;

            dbConnect.query(sql, async (err) => {
                if (err) {
                    console.error("Error creating user:", err);
                    return res.status(500).send("Error in creating user");
                }

                // ➕ Call insertUser after successful account creation
                try {
                    await insertUser(req.body);
                    return res.status(200).send(true);
                } catch (userErr) {
                    console.error("Error creating linked user:", userErr);
                    return res.status(500).send("Account created, but user creation failed");
                }
            });
        });
    } catch (error) {
        console.error("Unexpected error in createAccount:", error);
        return res.status(500).send("Internal server error");
    }
});

const insertUser = async (accountData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const password = accountData.password;
            const encryptedPassword = await bcrypt.hash(password, 12);
            const userType = accountData.userType || 1; // Default to 1
            const userId = 'U-' + generateRandomNumber(6);
            const userData = {
                userId: userId,
                accountId: accountData.accountId,
                name: accountData.name,
                email: accountData.emailId,
                phone: accountData.mobile,
                userType: userType,
                userImage: accountData.userImage || [],
                // userId: accountData.accountId,
                joiningDate: accountData.joiningDate || null,
                password: encryptedPassword,
                userInternalStatus: 1,
                lastUserInternalStatus: 1,
            };

            const checkIfExistsQuery = `SELECT * FROM users WHERE email = ? OR phone = ?`;
            dbConnect.query(checkIfExistsQuery, [userData.email, userData.phone], (err, results) => {
                if (err) return reject("Error checking if user exists");

                if (results.length > 0) {
                    return res.status(400).send("User with this email or phone number already exists");
                }
                const createClause = createClauseHandler(userData);
                const insertQuery = `INSERT INTO users (${createClause[0]}) VALUES (${createClause[1]})`;

                dbConnect.query(insertQuery, (err, result) => {
                    if (err) return reject("Error inserting user");

                    const rbacValues = {
                        1: 'leads,callbacks,files,partial,team,credit,bankers,logins,approvals,disbursals,rejects,reports,filesinprocess,followups,ipAddress',
                        2: 'leads,callbacks,files,partial,team,credit,bankers,logins,approvals,disbursals,rejects,filesinprocess,followups',
                        3: 'leads,callbacks,files,followups',
                        4: 'leads,callbacks,files,partial,team,credit,bankers,logins,approvals,disbursals,rejects,filesinprocess,followups',
                        5: 'leads,callbacks,files,partial,team,followups'
                    };

                    const rbacValue = rbacValues[userType];
                    if (rbacValue) {
                        const updateRbacQuery = `UPDATE users SET rbac = ? WHERE id = ?`;
                        dbConnect.query(updateRbacQuery, [rbacValue, result.insertId], (err) => {
                            if (err) return reject("Error updating RBAC");
                            resolve(true);
                        });
                    } else {
                        resolve(true);
                    }
                });
            });
        } catch (error) {
            reject("Unexpected error during user creation");
        }
    });
};



const deleteAccount = asyncHandler(async (req, res) => {
    try {
        const accountId = req.params.accountId;

        const sql = `DELETE FROM accounts WHERE accountId = ?`;
        dbConnect.query(sql, [accountId], (err, result) => {
            if (err) {
                console.error("deleteAccount error:", err);
                return res.status(500).send("Error in deleting the account");
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Account not found" });
            }

            return res.status(200).json({ message: "User deleted successfully" });
        });
    } catch (error) {
        console.error("Unexpected error in deleteAccount:", error);
        return res.status(500).send("Internal server error");
    }
});


const getAccountById = asyncHandler(async (req, res) => {
    try {
        const accountId = req.params.accountId;

        const sql = `SELECT * FROM account WHERE accountId = ?`;
        dbConnect.query(sql, [accountId], (err, result) => {
            if (err) {
                console.error("getAccountById error in controller:", err);
                return res.status(500).send("Error in fetching account");
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "Account not found" });
            }

            const parsedResult = parseNestedJSON(result[0]);
            return res.status(200).send(parsedResult);
        });
    } catch (error) {
        console.error("Unexpected error in getAccountById:", error);
        return res.status(500).send("Internal server error");
    }
});






module.exports = {
    createAccount,
    deleteAccount,

    getAccountById,



};
