const dbConnect = require("../config/dbConnection");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Please Enter Username and Password");
  }
  //const sql = `SELECT * FROM users WHERE email = "${username}" OR name = "${username}"`;
  const sql = `SELECT * FROM users WHERE (email = "${username}" OR name = "${username}") AND status = "Active"`;
  console.log(sql)
  dbConnect.query(sql, async (err, result) => {
    if (err) {
      console.log("adminlogin error in controller");
    }
    if (
      result &&
      result.length == 1 &&
      (await bcrypt.compare(password, result[0].password))
    ) {
      const user = result[0];
      delete user.token;
      const accessToken = jwt.sign(
        {
          user: user,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10h" }
      );
      if (user.userType == 1) {
        const updateTokenSQL = `UPDATE users SET token = ? WHERE id = ?`;
        dbConnect.query(updateTokenSQL, [accessToken, user.id], (err) => {
          if (err) {
            console.log("Error updating token", err);
          }
        });
      }
      res.status(200).json({ accessToken });
    } else {
      res.status(401).send("Username or Password Incorrect");
    }
  });
});
const userLogout = asyncHandler(async (req, res) => {
  const expiredToken = (
    req.headers.authorization || req.headers.Authorization
  ).replace("Bearer ", "");
  const decodedToken = jwt.decode(expiredToken);
  decodedToken.exp = Math.floor(Date.now() / 1000) - 60;
  const invalidatedToken = jwt.sign(
    decodedToken,
    process.env.ACCESS_TOKEN_SECRET
  );
  res.status(200).json({ message: "Logout successful" });
});

const userLogoutforIp = asyncHandler(async (req, res) => {
  const expiredToken = (
    req.headers.authorization || req.headers.Authorization
  ).replace("Bearer ", "");
  const decodedToken = jwt.decode(expiredToken);
  decodedToken.exp = Math.floor(Date.now() / 1000) - 60;
  const invalidatedToken = jwt.sign(
    decodedToken,
    process.env.ACCESS_TOKEN_SECRET
  );
  res.status(419).send("Access denied. IP not allowed");
  //if ip address based login then return the status 419 
  //and when the first api calls tatus is 419 then stop another api calls 
});
module.exports = { userLogout, userLogin, userLogoutforIp };
