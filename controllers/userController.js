const dbConnect = require("../config/dbConnection");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Please Enter Username and Password");
  }
  //const sql = `SELECT * FROM users WHERE email = "${username}" OR name = "${username}"`;
  // const sql = `SELECT * FROM users WHERE (email = "${username}" OR name = "${username}") AND status = "Active"`;
  const sql = `SELECT * FROM users WHERE email = "${username}" AND status = "Active"`;
  console.log(sql)
  console.log(req.body)
  dbConnect.query(sql, async (err, result) => {
    console.log(sql)
    if (err) {
      console.log("adminlogin error in controller");
    }
    if (
      result &&
      result.length == 1 &&
      (await bcrypt.compare(password, result[0].password))
    ) {
      const user = result[0];
      console.log(user)
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
  let expiredToken = (
    req.headers.authorization || req.headers.Authorization
  );
  if (expiredToken) {
    expiredToken = expiredToken.replace("Bearer ", "");
    const decodedToken = jwt.decode(expiredToken);
    decodedToken.exp = Math.floor(Date.now() / 1000) - 60;
    const invalidatedToken = jwt.sign(
      decodedToken,
      process.env.ACCESS_TOKEN_SECRET
    );
  }
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  try {
    // ✅ Use promise wrapper for async/await
    const [user] = await dbConnect.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (!user || user.length === 0) {
      return res.status(404).send('User not found');
    }
    const foundUser = user[0];
    // Create reset token
    const token = jwt.sign({ id: foundUser.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });
    // Reset link
    // http://localhost:4200/#/user/forgot-password
    const resetLink = `${process.env.FRONTEND_URL}/#/user/reset-password?token=${token}`;
    // Mail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // const mailOptions = {
    //   from: '"Loan CRM" <no-reply@yourdomain.com>',
    //   to: email,
    //   subject: 'Password Reset Request',
    //   html: `
    //     <p>Hello,</p>
    //     <p>You requested to reset your password. Click the link below to reset it:</p>
    //     <a href="${resetLink}">${resetLink}</a>
    //     <p>This link will expire in 15 minutes.</p>
    //   `,
    // };

    const mailOptions = {
      from: '"Loan CRM" <no-reply@yourdomain.com>',
      to: email,
      subject: 'Loan CRM | 🔐 Password Reset Request',
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 24px; border-radius: 10px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 25px;">
        <img src="https://loancrm.org/assets/images/logo.svg" alt="Loan CRM" style="height: 50px; margin-bottom: 10px;" />
        <h2 style="color: #29415B; margin: 0;">Loan CRM</h2>
      </div>

      <p style="font-size: 16px; color: #333;">Hi, ${foundUser.name}</p>
      <p style="font-size: 15px; color: #555;">
        We received a request to reset your Loan CRM account password. Click the button below to reset it:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #29415B; color: #fff; padding: 14px 24px; font-size: 16px; border-radius: 5px; text-decoration: none; display: inline-block;">
          🔐 Reset Password
        </a>
      </div>

      <p style="font-size: 14px; color: #777;">
        If you didn’t request this, you can safely ignore this message. This link will expire in <strong>15 minutes</strong>.
      </p>

      <hr style="margin: 40px 0; border: none; border-top: 1px solid #e0e0e0;" />
      
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        &copy; ${new Date().getFullYear()} Loan CRM. All rights reserved.
      </p>
    </div>
  `,
    };


    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link has been sent to your email.' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  console.log(req.body)
  if (!token || !password) {
    return res.status(400).json({ message: 'Token and password are required' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.id;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password in the database
    const [result] = await dbConnect.promise().query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found or password not updated' });
    }

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).send("Error : " + error.message);
  }
};

module.exports = { userLogout, userLogin, userLogoutforIp, forgotPassword, resetPassword };
