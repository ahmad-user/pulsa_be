const express = require("express");

const app = express.Router();

app.post("/login", async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.status(401).json({
        status: 103,
        message: "password salah",
        data: null,
      });
    }
    const userId = user[0].id;
    const email = user[0].email;
    const password = user[0].password;
    const accessToken = jwt.sign(
      { userId, email, password },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "12h",
      }
    );
    res.status(200).json({
      status: 0,
      message: "Login Sukses",
      data: accessToken,
    });
  } catch (error) {
    res.status(404).json({
      status: 102,
      message: "Parameter Email Tidak Sesuai Format",
      data: null,
    });
  }
});

module.exports = app;
