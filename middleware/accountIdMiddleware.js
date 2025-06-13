// const dbConnect = require("../config/dbConnection");

// const accountIdMiddleware = (req, res, next) => {
//     const user = req.user;
//     if (!user || !user.accountId) {
//         return res.status(403).send("Access denied. No account ID found.");
//     }

//     const originalQuery = dbConnect.query.bind(dbConnect);
//     const accountId = user.accountId;

//     dbConnect.query = (sql, params, callback) => {
//         if (typeof params === "function") {
//             callback = params;
//             params = [];
//         }
//         params = params || [];

//         // Only modify SELECT queries
//         if (!sql.trim().toLowerCase().startsWith("select")) {
//             return originalQuery(sql, params, callback);
//         }

//         // Do not modify if already filters by accountId
//         if (sql.toLowerCase().includes("accountid =")) {
//             return originalQuery(sql, params, callback);
//         }

//         // Remove trailing semicolon
//         sql = sql.trim().replace(/;$/, "");

//         // Extract ORDER BY and LIMIT/OFFSET if present
//         let orderBy = "";
//         let limitOffset = "";

//         const orderByMatch = sql.match(/\sorder\s+by\s[\w`,.\s]+$/i);
//         if (orderByMatch) {
//             orderBy = orderByMatch[0];
//             sql = sql.slice(0, orderByMatch.index).trim();
//         }

//         const limitOffsetMatch = sql.match(/\slimit\s+\d+(\s+offset\s+\d+)?$/i);
//         if (limitOffsetMatch) {
//             limitOffset = limitOffsetMatch[0];
//             sql = sql.slice(0, limitOffsetMatch.index).trim();
//         }

//         // Extract table name after FROM to avoid subqueries
//         const fromMatch = sql.match(/\bfrom\s+([^\s(]+)/i);
//         if (!fromMatch) {
//             // FROM clause not found or using subquery — skip
//             return originalQuery(sql, params, callback);
//         }

//         // Only modify if FROM clause uses a direct table (not a subquery)
//         const tableName = fromMatch[1].toLowerCase();
//         const safeTables = ["leads", "callbacks", "users", "disbursals"]; // <- list your real tables here

//         if (!safeTables.includes(tableName)) {
//             // Likely a subquery or unsupported table — skip
//             return originalQuery(sql, params, callback);
//         }

//         // Add WHERE or AND accountId filter
//         if (/\swhere\s/i.test(sql)) {
//             sql += " AND accountId = ?";
//         } else {
//             sql += " WHERE accountId = ?";
//         }

//         const modifiedSql = sql + orderBy + limitOffset;
//         const finalParams = [...params, accountId];

//         console.log("Modified SQL:", modifiedSql);
//         return originalQuery(modifiedSql, finalParams, callback);
//     };

//     next();
// };

// module.exports = accountIdMiddleware;


const dbConnect = require("../config/dbConnection");

const accountIdMiddleware = (req, res, next) => {
    // console.log("req.skipAccountIdMiddleware,==========================================", req.skipAccountIdMiddleware)
    if (req.skipAccountIdMiddleware) {
        console.log("⛔ Skipping accountIdMiddleware for this route");
        return next(); // ✅ SKIP!
    }
    const user = req.user;
    if (!user || !user.accountId) {
        return res.status(403).send("Access denied. No account ID found.");
    }

    const originalQuery = dbConnect.query.bind(dbConnect);
    const accountId = user.accountId;

    dbConnect.query = (sql, params, callback) => {
        if (typeof params === "function") {
            callback = params;
            params = [];
        }
        params = params || [];

        const trimmedSql = sql.trim().toLowerCase();

        // 1. SELECT - add accountId filter
        if (trimmedSql.startsWith("select")) {
            // Skip if already has accountId
            if (sql.toLowerCase().includes("accountid =")) {
                return originalQuery(sql, params, callback);
            }

            // Remove trailing semicolon
            sql = sql.trim().replace(/;$/, "");

            // Extract ORDER BY and LIMIT/OFFSET
            let orderBy = "";
            let limitOffset = "";

            const orderByMatch = sql.match(/\sorder\s+by\s[\w`,.\s]+$/i);
            if (orderByMatch) {
                orderBy = orderByMatch[0];
                sql = sql.slice(0, orderByMatch.index).trim();
            }

            const limitOffsetMatch = sql.match(/\slimit\s+\d+(\s+offset\s+\d+)?$/i);
            if (limitOffsetMatch) {
                limitOffset = limitOffsetMatch[0];
                sql = sql.slice(0, limitOffsetMatch.index).trim();
            }

            // Check if FROM uses direct table
            const fromMatch = sql.match(/\bfrom\s+([^\s(]+)/i);
            if (!fromMatch) return originalQuery(sql, params, callback);

            const tableName = fromMatch[1].toLowerCase();
            const safeTables = ["userrole", "leadsources","leadstatus"];

            if (safeTables.includes(tableName)) {
                return originalQuery(sql, params, callback);
            }

            // Add accountId filter
            if (/\swhere\s/i.test(sql)) {
                sql += " AND accountId = ?";
            } else {
                sql += " WHERE accountId = ?";
            }

            const modifiedSql = sql + orderBy + limitOffset;
            const finalParams = [...params, accountId];

            console.log("Modified SELECT SQL:", modifiedSql);
            console.log("finalParams", finalParams)
            return originalQuery(modifiedSql, finalParams, callback);
        }

        // 2. INSERT - add accountId column and value
        if (trimmedSql.startsWith("insert into")) {
            const insertMatch = sql.match(/^insert\s+into\s+([^\s(]+)\s*\(([^)]+)\)\s+values\s*\(([^)]+)\)/i);
            if (!insertMatch) return originalQuery(sql, params, callback);

            const tableName = insertMatch[1].toLowerCase();
            // const safeTables = ["userrole", "leadsources"];

            // if (!safeTables.includes(tableName)) {
            //     return originalQuery(sql, params, callback);
            // }

            // Extract existing columns and placeholders
            const columns = insertMatch[2].split(',').map(c => c.trim());
            const placeholders = insertMatch[3].split(',').map(p => p.trim());

            // If accountId already included, skip
            if (columns.includes("accountId")) {
                return originalQuery(sql, params, callback);
            }

            // Add accountId
            columns.push("accountId");
            placeholders.push("?");

            const modifiedSql = `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`;
            const finalParams = [...params, accountId];

            console.log("Modified INSERT SQL:", modifiedSql);
            return originalQuery(modifiedSql, finalParams, callback);
        }

        // 3. Default - run original
        return originalQuery(sql, params, callback);
    };

    next();
};

module.exports = accountIdMiddleware;
