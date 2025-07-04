const dbConnect = require("../config/dbConnection");
const { userLogoutforIp } = require("../controllers/userController");
const jwt = require("jsonwebtoken");
function isUserLoggedIn(req) {
    return req.body.username == null;
}
let allowedIPs = [];
// function fetchAllowedIPs(req) {
//     return new Promise((resolve, reject) => {
//         // console.log(req.user)
//         req.dbQuery("SELECT ipAddress FROM ipaddresses", (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             const prefixes = results.map((row) =>
//                 row.ipAddress.split(".").slice(0, 2).join(".")
//             );
//             resolve(prefixes);
//         });
//     });
// }
function fetchAllowedIPs(req) {
    return new Promise((resolve, reject) => {
        const accountId = req.user?.accountId;
        if (!accountId) {
            return reject(new Error("accountId not found in request"));
        }
        const sql = "SELECT ipAddress FROM ipaddresses WHERE accountId = ?";
        dbConnect.query(sql, [accountId], (err, results) => {
            if (err) {
                return reject(err);
            }
            const prefixes = results.map((row) =>
                row.ipAddress.split(".").slice(0, 2).join(".")
            );
            resolve(prefixes);
        });
    });
}

// async function fetchClientIP() {
//     try {
//         const response = await axios.get("https://api.ipify.org?format=json");
//         currentClientIP = response.data.ip;
//         console.log("Fetched Client IP:", currentClientIP);
//     } catch (error) {
//         console.error("Error fetching client IP:", error);
//     }
// }

// async function ipWhitelist(req, res, next) {
//     try {
//         allowedIPs = await fetchAllowedIPs();
//         if (allowedIPs.includes("0.0.0.0")) {
//             return next();
//         }
//         // console.log(req.headers["mysystem-ip"])
//         const clientIPPrefix = req.headers["mysystem-ip"].split(".").slice(0, 2).join(".");
//         const isAllowed = allowedIPs.includes(clientIPPrefix);
//         if (isAllowed) {
//             next();
//         } else {
//             if (isUserLoggedIn(req)) {
//                 return userLogoutforIp(req, res);
//             } else {
//                 res.status(403).send("Access denied. IP not allowed");
//             }
//         }
//     } catch (error) {
//         console.error("Error handling IP whitelist:", error);
//         res.status(500).send("Internal server error");
//     }
// }

async function ipWhitelist(req, res, next) {
    try {
        const allowedIPs = await fetchAllowedIPs(req); // should return an array like ["123.45", "127.0", "0.0.0.0"]
        // console.log(allowedIPs)
        // If '0.0.0.0' is present, skip IP restriction
        if (allowedIPs.includes("0.0")) {
            return next();
        }
        const clientIPHeader = req.headers["mysystem-ip"];
        if (!clientIPHeader) {
            return res.status(400).send("Client IP missing from headers.");
        }
        const clientIPPrefix = clientIPHeader.split(".").slice(0, 2).join(".");
        const isAllowed = allowedIPs.includes(clientIPPrefix);
        if (isAllowed) {
            next();
        } else {
            if (isUserLoggedIn(req)) {
                return userLogoutforIp(req, res);
            } else {
                res.status(403).send("Access denied. IP not allowed");
            }
        }
    } catch (error) {
        console.error("Error handling IP whitelist:", error);
        res.status(500).send("Internal server error");
    }
}

const applyIpWhitelist = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).send("Authorization header missing");
        }
        const token = authHeader.split(" ")[1];
        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        try {
            const decoded = jwt.verify(token, secretKey);
            const userType = decoded?.user?.userType || "";
            if (userType == 1) {
                return next();
            }
            await ipWhitelist(req, res, next);
        }
        catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(419).send("Session expired. Please log in again.");
            } else {
                return res.status(419).send("Invalid token. Authentication failed.");
            }
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
}
module.exports = applyIpWhitelist;
